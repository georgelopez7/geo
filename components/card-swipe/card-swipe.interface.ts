export interface IQuestion {
  id: number;
  question: string;
  answers: { text: string; correct: boolean }[];
}

export type IDirection = "left" | "right";

export interface ICardSwipe {
  question: IQuestion;
  onSwipeComplete?: (direction: IDirection, cardID: number) => void;
}
