import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  FlashcardState,
  MockTestQuestion,
  Question,
  TopicStats,
} from "@/lib/types";
import { MOCK_TEST_QUESTIONS, TOPIC_ORDER } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FlashcardItem {
  question: Question;
  index: number;
  id: number;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function formatDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function calculateAccuracy(
  topic: string,
  topicStats: Record<string, TopicStats>
): number {
  const ts = topicStats[topic];
  if (!ts || ts.answered === 0) return 0;
  return Math.round((ts.correct / ts.answered) * 100);
}

export function getTopics(questions: Question[]): string[] {
  const set = new Set(TOPIC_ORDER);
  questions.forEach((q) => set.add(q.topic || "Other"));
  return Array.from(set);
}

export function getDueFlashcards(
  questions: Question[],
  flashcardState: Record<string, FlashcardState>
): { due: FlashcardItem[]; fresh: FlashcardItem[] } {
  const today = todayStr();
  const due: FlashcardItem[] = [];
  const fresh: FlashcardItem[] = [];
  questions.forEach((q, idx) => {
    const id = q.id ?? idx;
    const state = flashcardState[String(id)];
    if (state && state.dueDate && state.dueDate <= today) {
      due.push({ question: q, index: idx, id });
    } else if (!state) {
      fresh.push({ question: q, index: idx, id });
    }
  });
  return { due, fresh };
}

export function generateMockTest(questions: Question[]): MockTestQuestion[] {
  const byTopic: Record<string, (Question & { originalIndex: number })[]> = {};
  questions.forEach((q, i) => {
    const t = q.topic || "Other";
    if (!byTopic[t]) byTopic[t] = [];
    byTopic[t].push({ ...q, originalIndex: i });
  });

  const topics = getTopics(questions);
  const perTopic = Math.floor(MOCK_TEST_QUESTIONS / topics.length);
  const selected: (Question & { originalIndex: number })[] = [];

  topics.forEach((t) => {
    const pool = byTopic[t] || [];
    const pick = Math.min(perTopic, pool.length);
    selected.push(...shuffleArray(pool).slice(0, pick));
  });

  while (selected.length < MOCK_TEST_QUESTIONS) {
    const idx = Math.floor(Math.random() * questions.length);
    const q = questions[idx];
    const alreadySelected = selected.some(
      (x) => (x.id ?? x.originalIndex) === (q.id ?? idx)
    );
    if (!alreadySelected) {
      selected.push({ ...q, originalIndex: idx });
    }
  }

  return shuffleArray(selected)
    .slice(0, MOCK_TEST_QUESTIONS)
    .map((q, i) => ({
      ...q,
      orderIndex: i,
      shuffledOptions: shuffleArray(
        q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }))
      ),
      flagged: false,
      userAnswer: null,
    }));
}

export function updateStreak(
  lastStudyDate: string,
  streakDays: number
): { lastStudyDate: string; streakDays: number } {
  const today = todayStr();
  let newStreak = streakDays;
  if (!lastStudyDate) {
    newStreak = 1;
  } else if (lastStudyDate === today) {
    // no change
  } else {
    const diff = daysBetween(lastStudyDate, today);
    if (diff === 1) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }
  return { lastStudyDate: today, streakDays: newStreak };
}

export function getWeakestTopic(
  topics: string[],
  topicStats: Record<string, TopicStats>
): string | null {
  let worst: string | null = null;
  let worstAcc = 101;
  topics.forEach((t) => {
    const ts = topicStats[t];
    if (ts && ts.answered > 0) {
      const acc = (ts.correct / ts.answered) * 100;
      if (acc < worstAcc) {
        worstAcc = acc;
        worst = t;
      }
    }
  });
  return worst;
}
