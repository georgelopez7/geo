import QuizScreen from "@/components/screens/quiz-screen/quiz-screen";
import { Redirect, useLocalSearchParams } from "expo-router";
import React from "react";

const QuizScreenPage = () => {
  const { quizID } = useLocalSearchParams<{ quizID: string }>();
  console.log("QuizScreenPage quizID:", quizID);

  if (!quizID) {
    return <Redirect href="/+not-found" />;
  }

  return <QuizScreen quizID={quizID} />;
};

export default QuizScreenPage;
