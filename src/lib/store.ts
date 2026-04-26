"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  HazardClip,
  HazardScoreItem,
  PersistedState,
  PremiumState,
  Question,
  QuizAnswer,
  QuizHistoryItem,
  QuizSession,
  MockTestSession,
  HazardSession,
  MockTestQuestion,
} from "@/lib/types";
import {
  STORAGE_KEY,
  MOCK_TEST_QUESTIONS,
  MOCK_TEST_PASS_MARK,
  MOCK_TEST_DURATION,
  HAZARD_CLIPS,
} from "@/lib/constants";
import {
  shuffleArray,
  todayStr,
  updateStreak as computeStreak,
  generateMockTest as genMockTest,
  getDueFlashcards,
} from "@/lib/utils";
import type { FlashcardItem } from "@/lib/utils";

const initialPersistedState: PersistedState = {
  user: { name: "", testDate: "", theme: "auto" },
  stats: {
    totalAnswered: 0,
    correctCount: 0,
    streakDays: 0,
    lastStudyDate: "",
    quizzesCompleted: 0,
    topicStats: {},
  },
  flashcardState: {},
  quizHistory: [],
  premium: { isPremium: false, quizzesUntilUpsell: 3 },
  hazardScores: [],
  signViews: [],
  topicConfidence: {},
};

interface AppStore extends PersistedState {
  currentScreen: string;
  quiz: QuizSession | null;
  mockTest: MockTestSession | null;
  flashcard: { queue: FlashcardItem[]; current: number } | null;
  hazard: HazardSession | null;

  setUser: (user: Partial<PersistedState["user"]>) => void;
  updateStats: (topic: string, correct: boolean) => void;
  updateStreak: () => void;

  startQuiz: (topic: string, difficulty: string, questions: Question[]) => void;
  answerQuizQuestion: (selectedIdx: number, questions: Question[]) => void;
  nextQuizQuestion: () => void;
  finishQuiz: () => { correct: number; total: number };
  resetQuiz: () => void;

  startFlashcards: (questions: Question[]) => void;
  rateFlashcard: (quality: number) => void;

  startMockTest: (questions: Question[]) => void;
  answerMockQuestion: (optionIdx: number) => void;
  navigateMock: (dir: number) => void;
  toggleMockFlag: () => void;
  submitMockTest: () => {
    correct: number;
    total: number;
    passed: boolean;
    pct: number;
    topicResults: Record<string, { total: number; correct: number }>;
    wrong: MockTestQuestion[];
  };

  startHazard: () => void;
  clickHazard: (elapsed: number, clip: HazardClip) => number;
  nextHazardClip: () => void;
  finishHazard: () => { total: number; max: number };

  checkUpsell: () => boolean;
  resetUpsell: () => void;

  resetAll: () => void;
  setTopicConfidence: (topic: string, level: number) => void;
  addSignView: (index: number) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialPersistedState,

      currentScreen: "dashboard",
      quiz: null,
      mockTest: null,
      flashcard: null,
      hazard: null,

      setUser: (user) => {
        set((state) => ({
          user: { ...state.user, ...user },
        }));
      },

      updateStats: (topic, correct) => {
        set((state) => {
          const newTopicStats = { ...state.stats.topicStats };
          if (!newTopicStats[topic]) {
            newTopicStats[topic] = { answered: 0, correct: 0 };
          }
          newTopicStats[topic] = {
            answered: newTopicStats[topic].answered + 1,
            correct: newTopicStats[topic].correct + (correct ? 1 : 0),
          };
          return {
            stats: {
              ...state.stats,
              totalAnswered: state.stats.totalAnswered + 1,
              correctCount: state.stats.correctCount + (correct ? 1 : 0),
              topicStats: newTopicStats,
            },
          };
        });
      },

      updateStreak: () => {
        set((state) => {
          const result = computeStreak(
            state.stats.lastStudyDate,
            state.stats.streakDays
          );
          return {
            stats: {
              ...state.stats,
              lastStudyDate: result.lastStudyDate,
              streakDays: result.streakDays,
            },
          };
        });
      },

      startQuiz: (topic, difficulty, questions) => {
        let pool = questions.map((q, i) => ({ ...q, originalIndex: i }));
        if (topic)
          pool = pool.filter((q) => (q.topic || "Other") === topic);
        if (difficulty !== "mixed")
          pool = pool.filter(
            (q) => (q.difficulty || "medium") === difficulty
          );
        if (pool.length === 0)
          pool = questions.map((q, i) => ({ ...q, originalIndex: i }));

        const initial = shuffleArray(pool)
          .slice(0, 10)
          .map((q) => ({
            ...q,
            shuffledOptions: shuffleArray(
              q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }))
            ),
            _correctOriginal: q.correctIndex,
          }));

        set({
          quiz: {
            queue: initial,
            currentIndex: 0,
            answers: [],
            wrong: [],
            topic,
            difficulty,
          },
        });
      },

      answerQuizQuestion: (selectedIdx, questions) => {
        const state = get();
        if (!state.quiz) return;
        const q = state.quiz.queue[state.quiz.currentIndex];
        if (!q) return;

        const shuffled = q.shuffledOptions;
        if (!shuffled || !shuffled.length) return;

        const correct =
          shuffled[selectedIdx]?.originalIndex === q.correctIndex;
        const topic = q.topic || "Other";

        const newTopicStats = { ...state.stats.topicStats };
        if (!newTopicStats[topic]) {
          newTopicStats[topic] = { answered: 0, correct: 0 };
        }
        newTopicStats[topic] = {
          answered: newTopicStats[topic].answered + 1,
          correct: newTopicStats[topic].correct + (correct ? 1 : 0),
        };

        const newAnswers: QuizAnswer[] = [
          ...state.quiz.answers,
          { correct, topic, difficulty: q.difficulty || "medium" },
        ];
        const newWrong = correct
          ? state.quiz.wrong
          : [...state.quiz.wrong, q];

        let newQueue = state.quiz.queue;
        if (!correct) {
          const similarPool = questions.filter(
            (x) =>
              (x.topic || "Other") === topic &&
              (x.difficulty || "medium") === (q.difficulty || "medium") &&
              x.question !== q.question
          );
          if (similarPool.length) {
            const extra =
              similarPool[Math.floor(Math.random() * similarPool.length)];
            newQueue = [
              ...state.quiz.queue,
              { ...extra, originalIndex: questions.indexOf(extra) },
            ];
          }
        }

        const streakResult = computeStreak(
          state.stats.lastStudyDate,
          state.stats.streakDays
        );

        set({
          quiz: {
            ...state.quiz,
            queue: newQueue,
            answers: newAnswers,
            wrong: newWrong,
          },
          stats: {
            ...state.stats,
            totalAnswered: state.stats.totalAnswered + 1,
            correctCount: state.stats.correctCount + (correct ? 1 : 0),
            topicStats: newTopicStats,
            lastStudyDate: streakResult.lastStudyDate,
            streakDays: streakResult.streakDays,
          },
        });
      },

      nextQuizQuestion: () => {
        set((state) => {
          if (!state.quiz) return state;
          return {
            quiz: {
              ...state.quiz,
              currentIndex: state.quiz.currentIndex + 1,
            },
          };
        });
      },

      finishQuiz: () => {
        const state = get();
        if (!state.quiz) return { correct: 0, total: 0 };
        const correct = state.quiz.answers.filter((a) => a.correct).length;
        const total = state.quiz.answers.length;

        const historyItem: QuizHistoryItem = {
          date: new Date().toISOString(),
          type: "quiz",
          correct,
          total,
          topic: state.quiz.topic || "mixed",
        };

        set({
          stats: {
            ...state.stats,
            quizzesCompleted: state.stats.quizzesCompleted + 1,
          },
          quizHistory: [...state.quizHistory, historyItem],
        });

        get().checkUpsell();

        return { correct, total };
      },

      resetQuiz: () => {
        set({ quiz: null });
      },

      startFlashcards: (questions) => {
        const { due, fresh } = getDueFlashcards(
          questions,
          get().flashcardState
        );
        const queue = [...due, ...fresh];
        if (queue.length === 0) {
          set({ flashcard: null });
          return;
        }
        set({ flashcard: { queue, current: 0 } });
      },

      rateFlashcard: (quality) => {
        const state = get();
        if (!state.flashcard) return;
        const item = state.flashcard.queue[state.flashcard.current];
        if (!item) return;

        const id = String(item.id);
        let s = state.flashcardState[id]
          ? { ...state.flashcardState[id] }
          : {
              easeFactor: 2.5,
              interval: 0,
              repetitions: 0,
              dueDate: todayStr(),
            };

        if (quality < 3) {
          s.repetitions = 0;
          s.interval = 1;
        } else {
          if (s.repetitions === 0) {
            s.interval = 1;
          } else if (s.repetitions === 1) {
            s.interval = 6;
          } else {
            if (quality === 3) {
              s.interval = Math.max(1, Math.round(s.interval * 1.2));
            } else if (quality === 4) {
              s.interval = Math.round(s.interval * s.easeFactor);
              s.repetitions += 1;
            } else if (quality === 5) {
              s.interval = Math.round(s.interval * s.easeFactor * 1.3);
              s.easeFactor += 0.15;
              s.repetitions += 1;
            }
          }
        }

        s.easeFactor = Math.max(
          1.3,
          s.easeFactor +
            (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        );

        const next = new Date();
        next.setDate(next.getDate() + s.interval);
        s.dueDate = next.toISOString().split("T")[0];

        set({
          flashcardState: {
            ...state.flashcardState,
            [id]: s,
          },
          flashcard: {
            ...state.flashcard,
            current: state.flashcard.current + 1,
          },
        });
      },

      startMockTest: (questions) => {
        set({
          mockTest: {
            questions: genMockTest(questions),
            currentIndex: 0,
            timeRemaining: MOCK_TEST_DURATION,
            submitted: false,
          },
        });
      },

      answerMockQuestion: (optionIdx) => {
        set((state) => {
          if (!state.mockTest) return state;
          const newQuestions = [...state.mockTest.questions];
          newQuestions[state.mockTest.currentIndex] = {
            ...newQuestions[state.mockTest.currentIndex],
            userAnswer: optionIdx,
          };
          return {
            mockTest: {
              ...state.mockTest,
              questions: newQuestions,
            },
          };
        });
      },

      navigateMock: (dir) => {
        set((state) => {
          if (!state.mockTest) return state;
          const next = state.mockTest.currentIndex + dir;
          if (next >= 0 && next < state.mockTest.questions.length) {
            return {
              mockTest: {
                ...state.mockTest,
                currentIndex: next,
              },
            };
          }
          return state;
        });
      },

      toggleMockFlag: () => {
        set((state) => {
          if (!state.mockTest) return state;
          const newQuestions = [...state.mockTest.questions];
          newQuestions[state.mockTest.currentIndex] = {
            ...newQuestions[state.mockTest.currentIndex],
            flagged: !newQuestions[state.mockTest.currentIndex].flagged,
          };
          return {
            mockTest: {
              ...state.mockTest,
              questions: newQuestions,
            },
          };
        });
      },

      submitMockTest: () => {
        const state = get();
        if (!state.mockTest) {
          return {
            correct: 0,
            total: MOCK_TEST_QUESTIONS,
            passed: false,
            pct: 0,
            topicResults: {},
            wrong: [],
          };
        }

        let correct = 0;
        const wrong: MockTestQuestion[] = [];
        const topicResults: Record<string, { total: number; correct: number }> =
          {};
        const newTopicStats = { ...state.stats.topicStats };
        let totalAnswered = state.stats.totalAnswered;
        let correctCount = state.stats.correctCount;

        state.mockTest.questions.forEach((q) => {
          const topic = q.topic || "Other";
          if (!topicResults[topic]) {
            topicResults[topic] = { total: 0, correct: 0 };
          }
          topicResults[topic].total += 1;

          const answeredCorrectly =
            q.userAnswer !== null &&
            q.shuffledOptions[q.userAnswer].originalIndex === q.correctIndex;

          if (answeredCorrectly) {
            correct += 1;
            topicResults[topic].correct += 1;
          } else {
            wrong.push(q);
          }

          if (!newTopicStats[topic]) {
            newTopicStats[topic] = { answered: 0, correct: 0 };
          }
          newTopicStats[topic] = {
            answered: newTopicStats[topic].answered + 1,
            correct:
              newTopicStats[topic].correct + (answeredCorrectly ? 1 : 0),
          };
          totalAnswered += 1;
          if (answeredCorrectly) correctCount += 1;
        });

        const streakResult = computeStreak(
          state.stats.lastStudyDate,
          state.stats.streakDays
        );

        const historyItem: QuizHistoryItem = {
          date: new Date().toISOString(),
          type: "mock",
          correct,
          total: MOCK_TEST_QUESTIONS,
        };

        const pct = Math.round((correct / MOCK_TEST_QUESTIONS) * 100);
        const passed = correct >= MOCK_TEST_PASS_MARK;

        set({
          stats: {
            ...state.stats,
            totalAnswered,
            correctCount,
            topicStats: newTopicStats,
            quizzesCompleted: state.stats.quizzesCompleted + 1,
            lastStudyDate: streakResult.lastStudyDate,
            streakDays: streakResult.streakDays,
          },
          quizHistory: [...state.quizHistory, historyItem],
          mockTest: {
            ...state.mockTest,
            submitted: true,
          },
        });

        get().checkUpsell();

        return { correct, total: MOCK_TEST_QUESTIONS, passed, pct, topicResults, wrong };
      },

      startHazard: () => {
        set({
          hazard: {
            scores: [],
            clicks: [],
            currentClip: 0,
          },
        });
      },

      clickHazard: (elapsed, clip) => {
        const state = get();
        if (!state.hazard) return 0;
        const idx = state.hazard.currentClip;
        if (
          state.hazard.clicks[idx] !== null &&
          state.hazard.clicks[idx] !== undefined
        ) {
          return state.hazard.scores[idx] ?? 0;
        }

        let score = 0;
        if (elapsed >= clip.hazardStart && elapsed <= clip.hazardEnd) {
          const windowSize = clip.hazardEnd - clip.hazardStart;
          const progress = (elapsed - clip.hazardStart) / windowSize;
          score = Math.max(
            0,
            Math.round(clip.maxScore - progress * clip.maxScore)
          );
        }

        const newScores = [...state.hazard.scores];
        newScores[idx] = score;
        const newClicks = [...state.hazard.clicks];
        newClicks[idx] = elapsed;

        set({
          hazard: {
            ...state.hazard,
            scores: newScores,
            clicks: newClicks,
          },
        });

        return score;
      },

      nextHazardClip: () => {
        set((state) => {
          if (!state.hazard) return state;
          return {
            hazard: {
              ...state.hazard,
              currentClip: state.hazard.currentClip + 1,
            },
          };
        });
      },

      finishHazard: () => {
        const state = get();
        if (!state.hazard) {
          const max = HAZARD_CLIPS.reduce((a, c) => a + c.maxScore, 0);
          return { total: 0, max };
        }
        const total = state.hazard.scores.reduce((a, b) => a + b, 0);
        const max = HAZARD_CLIPS.reduce((a, c) => a + c.maxScore, 0);

        const scoreItem: HazardScoreItem = {
          date: new Date().toISOString(),
          score: total,
          max,
        };

        set({
          hazardScores: [...state.hazardScores, scoreItem],
        });

        return { total, max };
      },

      checkUpsell: () => {
        const state = get();
        if (state.premium.isPremium) return false;
        const newCount = state.premium.quizzesUntilUpsell - 1;
        set({
          premium: {
            ...state.premium,
            quizzesUntilUpsell: newCount,
          },
        });
        if (newCount <= 0) {
          set({
            premium: {
              ...state.premium,
              quizzesUntilUpsell: 3,
            },
          });
          return true;
        }
        return false;
      },

      resetUpsell: () => {
        set((state) => ({
          premium: {
            ...state.premium,
            quizzesUntilUpsell: 3,
          },
        }));
      },

      resetAll: () => {
        localStorage.removeItem(STORAGE_KEY);
        set({
          ...initialPersistedState,
          currentScreen: "dashboard",
          quiz: null,
          mockTest: null,
          flashcard: null,
          hazard: null,
        });
      },

      setTopicConfidence: (topic, level) => {
        set((state) => ({
          topicConfidence: {
            ...state.topicConfidence,
            [topic]: level,
          },
        }));
      },

      addSignView: (index) => {
        set((state) => {
          if (state.signViews.includes(index)) return state;
          return {
            signViews: [...state.signViews, index],
          };
        });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        stats: state.stats,
        flashcardState: state.flashcardState,
        quizHistory: state.quizHistory,
        premium: state.premium,
        hazardScores: state.hazardScores,
        signViews: state.signViews,
        topicConfidence: state.topicConfidence,
      }),
    }
  )
);
