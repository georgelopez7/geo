import Spacer from "@/components/spacer/spacer";
import Strip from "@/components/strip/strip";
import { IQuiz } from "@/constants/types";
import { GetAllQuizzes } from "@/db/queries/quizzes/quizzes";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

export default function HomeScreen() {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      const quizzes = await GetAllQuizzes(10);
      setQuizzes(quizzes);
      setLoading(false);
    };

    asyncFunc();
  }, []);

  // LOADING STATE
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4">
        <Text className="text-2xl font-bold">Geo</Text>
        <Spacer size="medium" />
        <Text className="px-8 text-4xl font-bold text-center">Quizzes</Text>
        <Spacer size="small" />
        <FlatList
          data={quizzes}
          keyExtractor={(quiz) => quiz.id!}
          contentContainerStyle={{ paddingBottom: 220 }}
          renderItem={({ item }) => (
            <View>
              <Link
                href={{ pathname: "/quiz", params: { quizID: item.id } }}
                asChild
              >
                <Pressable>
                  <Strip text={item.name} showIcon />
                </Pressable>
              </Link>
              <Spacer size="xxsmall" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
