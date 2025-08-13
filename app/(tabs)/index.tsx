import Spacer from "@/components/spacer/spacer";
import Strip from "@/components/strip/strip";
import useGameState from "@/contexts/useGameState/useGameState";
import questions from "@/data/questions.json";
import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function HomeScreen() {
  const { setQuestions } = useGameState();

  const handlePress = () => {
    setQuestions(questions);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4">
        <Text className="text-2xl font-bold">Geo</Text>
        <Spacer size="large" />
        <Text className="px-8 text-4xl font-bold text-center">Quizzes</Text>
        <Spacer size="small" />

        <Pressable onPress={handlePress}>
          <Strip text="World Capitals" showIcon />
        </Pressable>

        <Spacer size="xsmall" />

        <Strip text="World Capitals" />

        <Spacer size="xsmall" />

        <Strip text="World Capitals" showIcon />
      </View>
    </SafeAreaView>
  );
}
