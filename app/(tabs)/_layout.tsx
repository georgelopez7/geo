import { HapticTab } from "@/components/HapticTab";
import { COLORS } from "@/constants/colors";
import { Tabs } from "expo-router";
import { House, Sparkles, User } from "lucide-react-native";
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
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 4,
        },
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
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color }) => <Sparkles size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
