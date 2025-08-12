import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { COLORS } from "@/constants/colors";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import "../../global.css";

export default function TabLayout() {
  const { primary, secondary, black, darkGrey } = COLORS;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: black,
        tabBarInactiveTintColor: darkGrey,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: primary,
            borderTopWidth: 4,
            borderTopColor: secondary,
          },
          default: {
            backgroundColor: primary,
            borderTopWidth: 4,
            borderTopColor: secondary,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
