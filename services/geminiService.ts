import { GoogleGenAI, Type } from "@google/genai";
import { StrategyData } from "../types";

// Initialize the GoogleGenAI client using the environment variable API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStrategy = async (clientName: string): Promise<StrategyData> => {
  // Use ai.models.generateContent to query the model with both name and prompt.
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Using the master HVAC business framework, generate a personalized strategy for ${clientName}. 
    Focus on the Toronto market (GTA, Etobicoke, North York). 
    Winter is the peak emergency season.
    The goal is to move them from a static website to an AI-driven high-conversion machine.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          conversionKillers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
              },
              required: ["title", "description", "impact"]
            }
          },
          aiScript: {
            type: Type.OBJECT,
            properties: {
              firstMessage: { type: Type.STRING },
              features: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["firstMessage", "features"]
          },
          emailHook: { type: Type.STRING },
          seoKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["conversionKillers", "aiScript", "emailHook", "seoKeywords"]
      }
    }
  });

  // Extract the text output using the .text property from the response object.
  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as StrategyData;
};