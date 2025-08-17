import { GEOGRAPHY_QUIZ, MATHEMATICS_QUIZ, SCIENCE_QUIZ } from "@/data/quizzes";
import { useEffect } from "react";
import { InsertQuiz } from "./queries/quizzes/quizzes";

// FUNCTION TO SEED THE DATABASE
export const SeedDB = async () => {
  await InsertQuiz(GEOGRAPHY_QUIZ);
  await InsertQuiz(MATHEMATICS_QUIZ);
  await InsertQuiz(SCIENCE_QUIZ);
};

// HOOK TO SEED THE DATABASE
export const useSeedDB = (migrationSuccess = false) => {
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        console.log("🌱 Starting database seeding...");
        await SeedDB();
        console.log("🌻 Database seeded");
      } catch (error) {
        console.error("❌ Error seeding database:", error);
      }
    };

    if (migrationSuccess) {
      asyncFunc();
    } else {
      console.log("⏳ Waiting for migrations...");
    }
  }, [migrationSuccess]);
};
