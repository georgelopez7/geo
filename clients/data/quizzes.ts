import { IQuiz } from "@/constants/types";

export const GEOGRAPHY_QUIZ: IQuiz = {
  name: "World Geography",
  questions: [
    {
      question: "What is the capital of Australia?",
      answers: [
        { answer: "Canberra", isCorrect: true },
        { answer: "Brisbane", isCorrect: false },
      ],
    },
    {
      question: "Which is the longest river in the world?",
      answers: [
        { answer: "Amazon River", isCorrect: true },
        { answer: "Nile River", isCorrect: false },
      ],
    },
    {
      question: "Mount Everest is located in which mountain range?",
      answers: [
        { answer: "Himalayas", isCorrect: true },
        { answer: "Alps", isCorrect: false },
      ],
    },
    {
      question: "Which country has the most time zones?",
      answers: [
        { answer: "United States", isCorrect: false },
        { answer: "France", isCorrect: true },
      ],
    },
  ],
};

export const MATHEMATICS_QUIZ: IQuiz = {
  name: "Mathematics Fundamentals",
  questions: [
    {
      question: "What is the value of π (pi) rounded to two decimal places?",
      answers: [
        { answer: "3.14", isCorrect: true },
        { answer: "3.16", isCorrect: false },
      ],
    },
    {
      question: "What is 15% of 200?",
      answers: [
        { answer: "25", isCorrect: false },
        { answer: "30", isCorrect: true },
      ],
    },
    {
      question: "If x + 5 = 12, what is the value of x?",
      answers: [
        { answer: "6", isCorrect: false },
        { answer: "7", isCorrect: true },
      ],
    },
    {
      question: "What is the square root of 144?",
      answers: [
        { answer: "12", isCorrect: true },
        { answer: "13", isCorrect: false },
      ],
    },
  ],
};

export const SCIENCE_QUIZ: IQuiz = {
  name: "General Science",
  questions: [
    {
      question: "What is the chemical symbol for gold?",
      answers: [
        { answer: "Au", isCorrect: true },
        { answer: "Ag", isCorrect: false },
      ],
    },
    {
      question: "How many bones are in the adult human body?",
      answers: [
        { answer: "196", isCorrect: false },
        { answer: "206", isCorrect: true },
      ],
    },
    {
      question: "What gas makes up approximately 78% of Earth's atmosphere?",
      answers: [
        { answer: "Nitrogen", isCorrect: true },
        { answer: "Argon", isCorrect: false },
      ],
    },
    {
      question: "What is the fastest land animal?",
      answers: [
        { answer: "Lion", isCorrect: false },
        { answer: "Cheetah", isCorrect: true },
      ],
    },
  ],
};
