import { IQuiz } from "@/constants/types";

export const CreateQuiz = async (
  prompt: string
): Promise<{ quiz: IQuiz | null; error: string | null }> => {
  const path = "/api/v1/quizzes";
  const endpoint = process.env.EXPO_PUBLIC_SERVER_URL + path;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });

  if (!response.ok) {
    return {
      quiz: null,
      error: "An error occurred. Please try again.",
    };
  }

  const data = await response.json();
  return {
    quiz: data.response as IQuiz,
    error: null,
  };
};
