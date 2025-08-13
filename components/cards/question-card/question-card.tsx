import { cn } from "@/utils/utils";
import React from "react";
import { Text, View } from "react-native";
import { IQuestionCardProps } from "./question-card.interface";

const QuestionCard = ({ className, text }: IQuestionCardProps) => {
  return (
    <View
      className={cn(
        "w-full bg-primary items-center justify-center rounded-3xl p-8 border-secondary border-4 aspect-square",
        className
      )}
    >
      <Text className="text-black text-4xl font-semibold text-center">
        {text}
      </Text>
    </View>
  );
};

export default QuestionCard;
