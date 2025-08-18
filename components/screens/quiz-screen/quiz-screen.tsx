import { CardSwipe } from "@/components/card-swipe/card-swipe";
import { IDirection } from "@/components/card-swipe/card-swipe.interface";
import AnswerCard from "@/components/cards/answer-card/answer-card";
import ScreenLayout from "@/components/screen-layout/screen-layout";
import Spacer from "@/components/spacer/spacer";
import useGameState from "@/contexts/useGameState/useGameState";
import { GetQuizById } from "@/db/queries/quizzes/quizzes";
import { Link } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { IsAnswerCorrect } from "./quiz-screen.helpers";
import { IQuizScreenProps } from "./quiz-screen.interface";

const QuizScreen = ({ quizID }: IQuizScreenProps) => {
  // GAME STATE
  const {
    questions,
    score,
    currentIndex,
    loading,
    hasEnded,
    showLeftActive,
    showRightActive,
    setCurrentIndex,
    setLoading,
    setHasEnded,
    setScore,
    setQuestions,
    getTotalNumOfQuestions,
  } = useGameState();

  // FETCH QUIZ FROM DB
  useEffect(() => {
    const asyncFunc = async () => {
      const quiz = await GetQuizById(quizID);
      console.log("🥩 Fetching Quiz from DB...");
      if (!quiz) {
        return;
      }
      setQuestions(quiz.questions);
      setLoading(false);
    };

    asyncFunc();
  }, [quizID, setQuestions, setLoading]);

  // GET CURRENT QUESTION
  const currentQuestion = questions[currentIndex] ?? null;
  const totalQuestions = getTotalNumOfQuestions();

  // HANDLE SWIPE COMPLETE
  const handleSwipeComplete = (direction: IDirection) => {
    // CHECK IF ANSWER IS CORRECT
    const isCorrect = IsAnswerCorrect(direction, currentQuestion);
    if (isCorrect) {
      setScore(score + 1);
    }

    // UPDATE GAME STATE
    const nextIndex = currentIndex + 1;
    const hasGameEnded = nextIndex > totalQuestions - 1;
    if (hasGameEnded) {
      setHasEnded(true);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  // LOADING STATE
  if (loading) {
    return (
      <ScreenLayout>
        <Spacer size="large" />
        <Text className="text-black text-center font-bold text-4xl">
          ✨ Loading...
        </Text>
      </ScreenLayout>
    );
  }

  // HANDLE END OF GAME
  if (hasEnded) {
    return (
      <ScreenLayout>
        <Spacer size="large" />
        <Text className="text-black text-center font-bold text-4xl">
          ✨ Score: {score}
        </Text>
        <Spacer size="medium" />
        <Link href="/" asChild>
          <Pressable className="flex-row items-center justify-center gap-2">
            <ArrowLeft />
            <Text className="text-xl font-semibold underline">Home</Text>
          </Pressable>
        </Link>
      </ScreenLayout>
    );
  }

  const { answers } = currentQuestion;

  return (
    <ScreenLayout>
      <Spacer size="small" />
      <Text className="text-black text-center font-bold text-3xl">
        Score: {score}
      </Text>
      <Spacer size="small" />
      <View className="w-4/5 mx-auto">
        <CardSwipe
          question={currentQuestion}
          onSwipeComplete={handleSwipeComplete}
        />
      </View>

      <Spacer size="medium" />
      <View className="flex-row justify-center gap-8">
        <AnswerCard
          text={answers[0].answer}
          isActive={showLeftActive}
          isDisabled={showRightActive}
        />
        <AnswerCard
          text={answers[1].answer}
          isActive={showRightActive}
          isDisabled={showLeftActive}
        />
      </View>
      <Spacer size="medium" />
      <Text className="text-black text-center font-bold text-2xl">
        {currentIndex + 1} / {totalQuestions}
      </Text>
    </ScreenLayout>
  );
};

export default QuizScreen;
