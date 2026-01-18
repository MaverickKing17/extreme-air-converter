import { GoogleGenAI, Type } from "@google/genai";
import { StrategyData } from "../types";

export const generateStrategy = async (clientName: string): Promise<StrategyData> => {
  // Initialize INSIDE the function to ensure process.env polyfill is ready
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Using the master HVAC business framework, generate a personalized strategy for ${clientName}. 
    Focus on the Toronto market (GTA, Etobicoke, North York). 
    Winter is the peak emergency season.
    Include a detailed pricing strategy for common services (Furnace Repair, AC Install, Air Purification) based on 2026 GTA market rates.
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
          seoKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          pricingTiers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                service: { type: Type.STRING },
                range: { type: Type.STRING },
                includes: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["service", "range", "includes"]
            }
          }
        },
        required: ["conversionKillers", "aiScript", "emailHook", "seoKeywords", "pricingTiers"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as StrategyData;
};