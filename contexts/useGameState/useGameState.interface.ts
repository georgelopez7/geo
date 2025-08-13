import { IQuestion } from "@/components/card-swipe/card-swipe.interface";

export interface IGameState {
  questions: IQuestion[];
  currentIndex: number;
  showLeftActive: boolean;
  showRightActive: boolean;
  score: number;
  hasEnded: boolean;
  setQuestions: (newQuestions: IQuestion[]) => void;
  setCurrentIndex: (index: number) => void;
  setHasEnded: (hasEnded: boolean) => void;
  setShowLeftActive: (active: boolean) => void;
  setShowRightActive: (active: boolean) => void;
  setScore: (score: number) => void;
  getCurrentQuestion: () => IQuestion;
  getTotalNumOfQuestions: () => number;
  reset: () => void;
}
