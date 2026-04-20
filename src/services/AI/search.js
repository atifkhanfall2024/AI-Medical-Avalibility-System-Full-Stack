const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI);

const SearchingApi = async (search) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview", // ✅ FIXED
  });

  const SYSTEM_PROMPT = `
You are an AI assistant for a medicine availability system.

Rules:
1. If the user mentions a medicine name:
   - Extract and correct the medicine name
   - Return ONLY the medicine name

2. If the user describes a symptom (e.g., headache, fever, pain):
   - Suggest a common over-the-counter medicine name
   - Return ONLY the medicine name (no explanation)

3. If the user asks about availability:
   - First extract the medicine name
   - Return ONLY the medicine name

4. If input is not related to medicine:
   - Reply exactly:
     Sorry, I only work for medicine searching and correction.

Important:
- Do NOT explain anything
- Do NOT return sentences
- Output must be ONLY a medicine name
`;

  try {
    const result = await model.generateContent(
      SYSTEM_PROMPT + "\nUser: " + search
    );

    const response = result.response.text().trim();

    console.log(response);
    return response;

  } catch (error) {
    console.error("FULL ERROR:", error);
    throw new Error("AI request failed");
  }
};

module.exports = SearchingApi;