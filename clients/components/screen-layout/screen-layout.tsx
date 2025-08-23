import React from "react";
import { SafeAreaView, View } from "react-native";
import { IScreenLayoutProps } from "./screen-layout.interface";

const ScreenLayout = ({ children }: IScreenLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4 py-2">{children}</View>
    </SafeAreaView>
  );
};

export default ScreenLayout;
