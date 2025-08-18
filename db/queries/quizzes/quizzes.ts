import { IQuestion, IQuiz } from "@/constants/types";
import { db } from "@/db/db";
import { answers, questions, quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// QUERY TO INSERT A QUIZ WITH QUESTIONS AND ANSWERS
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

// QUERY TO GET ALL QUIZZES
export const GetAllQuizzes = async (limit: number): Promise<IQuiz[]> => {
  return (await db.select().from(quizzes).limit(limit)) as IQuiz[];
};

// QUERY TO GET A QUIZ BY ID
export const GetQuizById = async (quizID: string): Promise<IQuiz | null> => {
  // COLLECT DATA FROM ALL TABLES
  const rows = await db
    .select({
      quizId: quizzes.id,
      quizName: quizzes.name,
      questionId: questions.id,
      question: questions.question,
      answerId: answers.id,
      answer: answers.answer,
      isCorrect: answers.isCorrect,
    })
    .from(quizzes)
    .innerJoin(questions, eq(quizzes.id, questions.quizId))
    .innerJoin(answers, eq(questions.id, answers.questionId))
    .where(eq(quizzes.id, quizID));

  // CHECK IF QUIZ EXISTS
  if (rows.length === 0) return null;

  // COLLATE QUESTIONS AND ANSWERS
  const questionsMap: Record<string, IQuestion> = {};

  for (const row of rows) {
    const questionID = row.questionId;
    const exists = questionsMap[questionID];

    // ADD QUESTION TO MAP
    if (!exists) {
      questionsMap[row.questionId] = {
        id: row.questionId,
        question: row.question,
        answers: [],
      };
    }

    // ADD ANSWER TO QUESTION
    questionsMap[questionID].answers.push({
      id: row.answerId,
      answer: row.answer,
      isCorrect: row.isCorrect,
    });
  }

  // CONVERT MAP TO ARRAY
  const questionsArray = Object.values(questionsMap);

  return {
    id: rows[0].quizId,
    name: rows[0].quizName,
    questions: questionsArray,
  };
};
