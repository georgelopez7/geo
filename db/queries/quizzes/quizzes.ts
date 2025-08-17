import { IQuiz } from "@/constants/types";
import { db } from "@/db/db";
import { answers, questions, quizzes } from "@/db/schema";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const InsertQuiz = async (
  quizInput: IQuiz
): Promise<{ quizID: string }> => {
  return await db.transaction(async (tx) => {
    // QUIZ
    const quizID = uuidv4();
    await tx.insert(quizzes).values({
      id: quizID,
      name: quizInput.name,
    });

    // QUESTIONS & ANSWERS
    for (const questionInput of quizInput.questions) {
      // QUESTION
      const questionID = uuidv4();
      await tx.insert(questions).values({
        id: questionID,
        quizId: quizID,
        question: questionInput.question,
      });

      // ANSWER
      const answerValues = questionInput.answers.map((answerInput) => ({
        id: uuidv4(),
        questionId: questionID,
        answer: answerInput.answer,
        isCorrect: answerInput.isCorrect,
      }));
      await tx.insert(answers).values(answerValues);
    }

    return { quizID };
  });
};
