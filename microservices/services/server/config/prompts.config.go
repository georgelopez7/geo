package config

var SYSTEM_PROMPT = `You are a helpful assistant that generates quizzes strictly in JSON format. 
You must always return a valid JSON object that matches the given TypeScript interfaces. 
Do not include explanations, markdown formatting, or extra text—only return raw JSON. 
Every quiz must contain exactly 10 questions, and each question must have:
- A "question" string.
- An "answers" array with exactly 2 objects.
- Each "answers" object must have:
  - "answer" (string).
  - "isCorrect" (boolean). Exactly one answer must be true, the rest false.
Ensure all strings are clear, concise, and relevant to the topic.`

var USER_PROMPT = `Create a quiz on the following topic: {{ PROMPT }}. 
Return it strictly in this JSON format:

{
  "name": "<quiz name>",
  "questions": [
    {
      "question": "string",
      "answers": [
        { "answer": "string", "isCorrect": true | false },
        { "answer": "string", "isCorrect": true | false },
      ]
    }
    // ... 9 more questions
  ]
}`
