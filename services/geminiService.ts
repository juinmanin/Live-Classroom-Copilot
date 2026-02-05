import { GoogleGenAI, Type } from "@google/genai";
import { MODEL_NAME, SYSTEM_PROMPT_TEMPLATE } from "../constants";
import { AppLanguage, AIAnalysisResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    // We initialize per request or update if needed, but here we constructor inject
    try {
        this.ai = new GoogleGenAI({ apiKey: this.apiKey });
    } catch (error) {
        console.error("Failed to initialize Gemini:", error);
    }
  }

  async analyzeFrame(
    base64Image: string,
    language: AppLanguage,
    recentContext: string
  ): Promise<AIAnalysisResult> {
    if (!this.ai) {
      throw new Error("Gemini AI not initialized. Check API Key.");
    }

    const systemInstruction = SYSTEM_PROMPT_TEMPLATE.replace('{{LANGUAGE}}', language);
    
    // Construct the user prompt with context
    const userPrompt = `
      Analyze this live classroom frame.
      Recent Context (last 5 mins): ${recentContext}
      
      Audio context: Teacher is speaking (Voice Activity Detected).
      
      Provide the JSON analysis.
    `;

    try {
        const response = await this.ai.models.generateContent({
            model: MODEL_NAME,
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
                    { text: userPrompt }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                temperature: 0.5, // Lower temperature for consistent analysis
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        engagement: { type: Type.NUMBER },
                        cognitiveLoad: { type: Type.NUMBER },
                        mood: { type: Type.STRING },
                        insight: { type: Type.STRING },
                        action: { type: Type.STRING },
                        alertLevel: { type: Type.STRING, enum: ["green", "yellow", "red"] }
                    },
                    required: ["engagement", "cognitiveLoad", "mood", "insight", "action", "alertLevel"]
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");

        const rawData = JSON.parse(text);

        return {
          metrics: {
            timestamp: Date.now(),
            engagement: rawData.engagement,
            cognitiveLoad: rawData.cognitiveLoad,
            mood: rawData.mood
          },
          insight: rawData.insight,
          action: rawData.action,
          alertLevel: rawData.alertLevel
        };

    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        // Fallback for demo purposes if API fails
        return {
            metrics: {
                timestamp: Date.now(),
                engagement: 50,
                cognitiveLoad: 50,
                mood: "Analyzing..."
            },
            insight: "System is recalibrating...",
            action: "Maintain current pace.",
            alertLevel: "yellow"
        };
    }
  }
}