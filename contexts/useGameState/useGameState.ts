import { create } from "zustand";
import { IGameState } from "./useGameState.interface";

const useGameState = create<IGameState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  showLeftActive: false,
  showRightActive: false,
  score: 0,
  hasEnded: false,

  setQuestions: (newQuestions) =>
    set({
      questions: newQuestions,
    }),

  setCurrentIndex: (index) => set({ currentIndex: index }),
  setHasEnded: (hasEnded) => set({ hasEnded }),
  setShowLeftActive: (active) => set({ showLeftActive: active }),
  setShowRightActive: (active) => set({ showRightActive: active }),
  setScore: (score) => set({ score }),

  getCurrentQuestion: () => {
    const state = get();
    return state.questions[state.currentIndex];
  },

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
