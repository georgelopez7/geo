import { create } from "zustand";
import { IGameState } from "./useGameState.interface";

const useGameState = create<IGameState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  showLeftActive: false,
  showRightActive: false,
  score: 0,
  loading: true,
  hasEnded: false,

  setQuestions: (newQuestions) =>
    set({
      questions: newQuestions,
    }),

  setCurrentIndex: (index) => set({ currentIndex: index }),
  setLoading: (loading) => set({ loading }),
  setHasEnded: (hasEnded) => set({ hasEnded }),
  setShowLeftActive: (active) => set({ showLeftActive: active }),
  setShowRightActive: (active) => set({ showRightActive: active }),
  setScore: (score) => set({ score }),

  getTotalNumOfQuestions: () => {
    const state = get();
    return state.questions.length;
  },

  reset: () =>
    set({
      questions: [],
      currentIndex: 0,
      showLeftActive: false,
      showRightActive: false,
    }),
}));

export default useGameState;
