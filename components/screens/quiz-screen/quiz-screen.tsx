import { CardSwipe } from "@/components/card-swipe/card-swipe";
import { IDirection } from "@/components/card-swipe/card-swipe.interface";
import AnswerCard from "@/components/cards/answer-card/answer-card";
import ScreenLayout from "@/components/screen-layout/screen-layout";
import Spacer from "@/components/spacer/spacer";
import useGameState from "@/contexts/useGameState/useGameState";
import { Link } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { IsAnswerCorrect } from "./quiz-screen.helpers";

const QuizScreen = () => {
  // GAME STATE
  const {
    score,
    currentIndex,
    hasEnded,
    showLeftActive,
    showRightActive,
    setCurrentIndex,
    setHasEnded,
    setScore,
    getCurrentQuestion,
    getTotalNumOfQuestions,
  } = useGameState();

  const currentQuestion = getCurrentQuestion();
  const { answers } = currentQuestion;
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

  return (
    <ScreenLayout>
      <Spacer size="small" />
      <Text className="text-black text-center font-bold text-3xl">
        Score: {score}
      </Text>
      <Spacer size="small" />
      <View className="w-4/5 mx-auto">
        <CardSwipe
          question={getCurrentQuestion()}
          onSwipeComplete={handleSwipeComplete}
        />
      </View>

      <Spacer size="medium" />
      <View className="flex-row justify-center gap-8">
        <AnswerCard
          text={answers[0].text}
          isActive={showLeftActive}
          isDisabled={showRightActive}
        />
        <AnswerCard
          text={answers[1].text}
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
