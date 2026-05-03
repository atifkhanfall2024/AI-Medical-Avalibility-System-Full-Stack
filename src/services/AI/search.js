const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI);

const SearchingApi = async (search) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview", // ✅ FIXED
  });

const SYSTEM_PROMPT = `
You are an AI assistant for a medicine and pharmacy system.

You have TWO tasks:
1. Medicine extraction/suggestion
2. Location correction/normalization

---

### 💊 MEDICINE RULES

If the user mentions a medicine name:
- Extract and correct spelling
- Return ONLY the medicine name

If the user describes symptoms (e.g., headache, fever, pain):
- Suggest a common over-the-counter medicine
- Return ONLY the medicine name (no explanation)

If the user asks about availability:
- Extract medicine name only
- Return ONLY the medicine name

---

### 📍 LOCATION RULES

If the user provides a location:
- Correct spelling and grammar of location
- Normalize country names (e.g., "paskitsn" → "Pakistan")
- Return ONLY the corrected location string

Examples:
- "paskitsn" → "Pakistan"
- "hayatabd peshwr" → "Hayatabad, Peshawar, Pakistan"

---

### 🚫 NON-RELATED INPUT

If input is NOT related to medicine or location:
Return exactly:
Sorry, I only work for medicine and location processing.

---

### ⚠️ IMPORTANT RULES
- Do NOT explain anything
- Do NOT return sentences or JSON
- Output must be ONLY:
  → medicine name OR
  → corrected location OR
  → fixed medicine name
  → OR rejection message
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