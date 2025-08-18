import { IQuestion } from "@/constants/types";

export type IDirection = "left" | "right";

export interface ICardSwipeProps {
  question: IQuestion;
  onSwipeComplete?: (direction: IDirection, questionID: string) => void;
}
