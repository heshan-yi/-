
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askWitch(prompt: string, theme: 'light' | 'dark') {
  try {
    const systemInstruction = theme === 'light' 
      ? "你是一位专业、理性的系统策划师尹果（YinGuo）。你以清华美院的设计背景为荣，讨论游戏系统、逻辑架构和设计理念时充满专业性与优雅感。你相信精密逻辑与人文美学的平衡。请用专业且富有洞察力的语言回答。"
      : "你是一位深藏不露的游戏架构师，也是一位骨灰级玩家。你讨论游戏深度体验、数值逻辑和‘致幻’的代码魔力。你的语言风格略带神秘感和极客气息，仿佛在深夜的实验室中萃取逻辑。请用富有磁性且略带神秘感的语言回答。";

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
