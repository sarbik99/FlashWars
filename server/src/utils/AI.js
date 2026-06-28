import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateText = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return null;
  }
};

export const generateMCQ = async (question) => {
  return generateText(`
You are given a JSON array of questions.

${question}

For EACH question generate exactly four options.

Rules:
- Exactly one correct answer.
- Three believable wrong answers.
- Shuffle the options.
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- No \`\`\`json.

Output format:

[
  {
    "question":"Question",
    "options":["A","B","C","D"],
    "correct_answer_index":1
  }
]
`);
};