import { cn } from "@/utils/utils";
import React from "react";
import { Text, View } from "react-native";
import { IAnswerCardProps } from "./answer-card.interface";

const AnswerCard = ({
  className,
  text,
  isActive,
  isDisabled,
}: IAnswerCardProps) => {
  return (
    <View
      className={cn(
        "bg-primary items-center justify-center rounded-3xl p-8 border-secondary border-4 aspect-[4/3]",
        className,
        isActive && "border-black",
        isDisabled && "opacity-30"
      )}
    >
      <Text className="text-black text-lg font-semibold text-center">
        {text}
      </Text>
    </View>
  );
};

export default AnswerCard;
