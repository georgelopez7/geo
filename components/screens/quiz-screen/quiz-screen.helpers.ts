import {
  IDirection,
  IQuestion,
} from "@/components/card-swipe/card-swipe.interface";

const DIRECTION_MAP: Record<IDirection, number> = {
  left: 0,
  right: 1,
};

export const IsAnswerCorrect = (
  direction: IDirection,
  question: IQuestion
): boolean => {
  const { answers } = question;
  const selectedAnswer = answers[DIRECTION_MAP[direction]];
  const isCorrect = selectedAnswer.correct;
  return isCorrect;
};
