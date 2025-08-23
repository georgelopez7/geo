import { IQuestion } from "@/constants/types";
export interface IGameState {
  questions: IQuestion[];
  currentIndex: number;
  showLeftActive: boolean;
  showRightActive: boolean;
  score: number;
  loading: boolean;
  hasEnded: boolean;
  setQuestions: (newQuestions: IQuestion[]) => void;
  setCurrentIndex: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setHasEnded: (hasEnded: boolean) => void;
  setShowLeftActive: (active: boolean) => void;
  setShowRightActive: (active: boolean) => void;
  setScore: (score: number) => void;
  getTotalNumOfQuestions: () => number;
  reset: () => void;
}
