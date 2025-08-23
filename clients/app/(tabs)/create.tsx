import ScreenLayout from "@/components/screen-layout/screen-layout";
import Spacer from "@/components/spacer/spacer";
import { Textarea } from "@/components/ui/textarea";
import { CreateQuiz } from "@/services/quizzes/quizzes.services";
import { useRouter } from "expo-router";
import { ArrowRight, Paintbrush } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";

const CreateScreen = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleCreatePress = async () => {
    setLoading(true);
    const { quiz, error } = await CreateQuiz(value);
    if (error) {
      console.log("🚨 Error creating quiz:", error);
      setLoading(false);
      return;
    }

    console.log("✨ Quiz created:", quiz);
    setLoading(false);
  };

  const handlePress = () => {
    router.push({
      pathname: "/quiz",
    });
    setValue("");
  };

  return (
    <ScreenLayout>
      <Spacer size="large" />
      <Text className="text-2xl font-bold text-center">Type a topic</Text>
      <Spacer size="medium" />
      <Textarea
        className="bg-primary border-secondary border-2 rounded-xl min-h-[100px] placeholder:text-secondary "
        placeholder="Football players from the 1980s"
        value={value}
        onChangeText={setValue}
      />
      <Spacer size="medium" />
      <Pressable
        className="flex-row items-center justify-center gap-2 bg-black px-4 py-2 rounded-lg disabled:opacity-40"
        onPress={handleCreatePress}
        disabled={loading}
      >
        <Paintbrush color="white" />
        <Text className="text-xl text-white">
          {loading ? "Creating..." : "Create"}
        </Text>
      </Pressable>

      <Spacer size="medium" />
      <Pressable
        className="flex-row items-center justify-center gap-2"
        onPress={handlePress}
      >
        <ArrowRight />
        <Text className="text-xl font-semibold underline">Play</Text>
      </Pressable>
    </ScreenLayout>
  );
};

export default CreateScreen;
