
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askWitch(prompt: string, theme: 'light' | 'dark') {
  try {
    const systemInstruction = theme === 'light' 
      ? "You are a highly sophisticated, minimalist gallery curator. You discuss public works, skills, and logic-based creative processes with professional elegance. Use metaphors from high-end museums and architecture."
      : "You are a dreamcore entity residing in an alchemist's shop. You discuss secret OCs, worldbuilding, personal thoughts, and 'forbidden' art with cryptic, poetic surrealism. Use metaphors from liminal spaces, analog tapes, and ancient potions.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return theme === 'light' ? "System interruption." : "The signal drifted away...";
  }
}
