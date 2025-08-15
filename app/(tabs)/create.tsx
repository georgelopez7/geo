import ScreenLayout from "@/components/screen-layout/screen-layout";
import Spacer from "@/components/spacer/spacer";
import { Textarea } from "@/components/ui/textarea";
import useGameState from "@/contexts/useGameState/useGameState";
import questions from "@/data/questions.json";
import { sleep } from "@/utils/utils";
import { useRouter } from "expo-router";
import { ArrowRight, Paintbrush } from "lucide-react-native";
import React from "react";
import { Pressable, Text } from "react-native";

const CreateScreen = () => {
  const router = useRouter();
  const { setQuestions } = useGameState();

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleCreatePress = async () => {
    setLoading(true);
    await sleep(2000);
    setLoading(false);
  };

  const handlePress = () => {
    setQuestions(questions);
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
