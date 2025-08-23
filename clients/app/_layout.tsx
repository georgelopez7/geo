import { db, enableForeignKeys, expoDB } from "@/db/db";
import migrations from "@/db/migrations/migrations";
import { useSeedDB } from "@/db/seed";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  // DATABASE MIGRATIONS
  enableForeignKeys();
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDB);
  useSeedDB(success);

  // FONTS
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (success) console.log("✨ Migrations completed successfully");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}
