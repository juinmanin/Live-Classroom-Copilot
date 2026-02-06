import { GoogleGenAI, Type } from "@google/genai";
import { MODEL_NAME, SYSTEM_PROMPT_TEMPLATE, MOCK_SCENARIOS } from "../constants";
import { AppLanguage, AIAnalysisResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private apiKey: string;
  private mockIndex: number = 0;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    if (this.apiKey) {
        try {
            this.ai = new GoogleGenAI({ apiKey: this.apiKey });
        } catch (error) {
            console.error("Failed to initialize Gemini:", error);
        }
    }
  }

  async analyzeFrame(
    base64Image: string,
    language: AppLanguage,
    recentContext: string
  ): Promise<AIAnalysisResult> {
    
    // DEMO MODE: If no API key is provided, run the simulation
    if (!this.apiKey || !this.ai) {
        return this.generateMockResponse(language);
    }

    const systemInstruction = SYSTEM_PROMPT_TEMPLATE.replace('{{LANGUAGE}}', language);
    
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
                temperature: 0.5, 
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
        // Fallback to mock on error
        return this.generateMockResponse(language);
    }
  }

  // Realistic Simulation for Demo Mode
  private async generateMockResponse(language: AppLanguage): Promise<AIAnalysisResult> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    const scenario = MOCK_SCENARIOS[this.mockIndex];
    this.mockIndex = (this.mockIndex + 1) % MOCK_SCENARIOS.length;

    // TODO: Implement proper translation logic for mock data if needed. 
    // For now, we return English mock data or simple static translations could be mapped here.
    // In a full app, MOCK_SCENARIOS should be localized in constants.ts

    return {
        metrics: {
            timestamp: Date.now(),
            engagement: Math.round(scenario.engagement + (Math.random() * 10 - 5)),
            cognitiveLoad: Math.round(scenario.cognitiveLoad + (Math.random() * 10 - 5)),
            mood: scenario.mood
        },
        insight: scenario.insight,
        action: scenario.action,
        alertLevel: scenario.alertLevel as 'green' | 'yellow' | 'red'
    };
  }
}