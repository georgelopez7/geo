import useGameState from "@/contexts/useGameState/useGameState";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import QuestionCard from "../cards/question-card/question-card";
import { ICardSwipe, IDirection } from "./card-swipe.interface";

const SWIPE_THRESHOLD = 100;
const SCREEN_WIDTH = 400;

export const CardSwipe = ({ question, onSwipeComplete }: ICardSwipe) => {
  // GAME STATE
  const { setShowLeftActive, setShowRightActive } = useGameState();

  // CONSTANTS
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // HANDLE SWIPE COMPLETE
  const onSwipeCompleteHandler = (direction: IDirection, cardID: number) => {
    if (onSwipeComplete) {
      onSwipeComplete(direction, cardID);
      runOnJS(setShowLeftActive)(false);
      runOnJS(setShowRightActive)(false);
    }

    translateX.value = 0;
    opacity.value = 1;
  };

  // GESTURE HANDLER
  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;

      if (event.translationX < -50) {
        // SWIPING LEFT
        runOnJS(setShowLeftActive)(true);
        runOnJS(setShowRightActive)(false);
      } else if (event.translationX > 50) {
        // SWIPING RIGHT
        runOnJS(setShowRightActive)(true);
        runOnJS(setShowLeftActive)(false);
      } else {
        runOnJS(setShowLeftActive)(false);
        runOnJS(setShowRightActive)(false);
      }
    })
    .onEnd((event) => {
      const shouldSwipeComplete =
        Math.abs(event.translationX) > SWIPE_THRESHOLD;
      if (shouldSwipeComplete) {
        const direction = event.translationX > 0 ? "right" : "left";
        const targetX = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;

        translateX.value = withTiming(
          targetX,
          { duration: 300 },
          (finished) => {
            if (finished) {
              runOnJS(onSwipeCompleteHandler)(direction, question.id || 0);
            }
          }
        );
      } else {
        translateX.value = withSpring(0);
        runOnJS(setShowLeftActive)(false);
        runOnJS(setShowRightActive)(false);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          rotateZ: `${translateX.value / 20}deg`,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View className="w-full" style={animatedCardStyle}>
        <QuestionCard text={question.question} />
      </Animated.View>
    </GestureDetector>
  );
};
