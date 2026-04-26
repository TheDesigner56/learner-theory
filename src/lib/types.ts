export interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface RoadSign {
  id: string;
  name: string;
  category: string;
  meaning: string;
  penalty: string;
  svg: string;
}

export interface FlashcardState {
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueDate: string;
}

export interface QuizAnswer {
  correct: boolean;
  topic: string;
  difficulty: string;
}

export interface QuizSession {
  queue: (Question & { originalIndex: number; shuffledOptions?: { text: string; originalIndex: number }[]; _shuffled?: { text: string; originalIndex: number }[]; _correctOriginal?: number })[];
  currentIndex: number;
  answers: QuizAnswer[];
  wrong: Question[];
  topic: string;
  difficulty: string;
}

export interface MockTestQuestion extends Question {
  originalIndex: number;
  orderIndex: number;
  shuffledOptions: { text: string; originalIndex: number }[];
  flagged: boolean;
  userAnswer: number | null;
}

export interface MockTestSession {
  questions: MockTestQuestion[];
  currentIndex: number;
  timeRemaining: number;
  submitted: boolean;
}

export interface HazardElement {
  type: string;
  start: number;
  end: number;
  css: string;
}

export interface HazardClip {
  title: string;
  description: string;
  duration: number;
  hazardStart: number;
  hazardEnd: number;
  maxScore: number;
  elements: HazardElement[];
}

export interface HazardSession {
  scores: number[];
  clicks: (number | null)[];
  currentClip: number;
}

export interface TopicStats {
  answered: number;
  correct: number;
}

export interface QuizHistoryItem {
  date: string;
  type: 'quiz' | 'mock';
  correct: number;
  total: number;
  topic?: string;
}

export interface HazardScoreItem {
  date: string;
  score: number;
  max: number;
}

export interface UserProfile {
  name: string;
  testDate: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface AppStats {
  totalAnswered: number;
  correctCount: number;
  streakDays: number;
  lastStudyDate: string;
  quizzesCompleted: number;
  topicStats: Record<string, TopicStats>;
}

export interface PremiumState {
  isPremium: boolean;
  quizzesUntilUpsell: number;
}

export interface PersistedState {
  user: UserProfile;
  stats: AppStats;
  flashcardState: Record<string, FlashcardState>;
  quizHistory: QuizHistoryItem[];
  premium: PremiumState;
  hazardScores: HazardScoreItem[];
  signViews: number[];
  topicConfidence: Record<string, number>;
}
