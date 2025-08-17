export interface IQuiz {
  id?: string;
  name: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id?: string;
  question: string;
  answers: IAnswer[];
  quizID?: string;
}

export interface IAnswer {
  id?: string;
  answer: string;
  isCorrect: boolean;
  questionID?: string;
}
