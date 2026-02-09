export interface ClassroomMetrics {
  timestamp: number;
  engagement: number; // 0-100
  cognitiveLoad: number; // 0-100
  mood: string;
}

// 9-Zone Grid Analysis (3x3)
export interface ZoneScore {
  zone: number; // 1-9
  engagement: number; // 0-100
  behavior: string; // e.g. "focused", "distracted", "sleeping"
}

export interface AIAnalysisResult {
  metrics: ClassroomMetrics;
  insight: string;
  action: string;
  alertLevel: 'green' | 'yellow' | 'red';
  zones?: ZoneScore[]; // 9-zone grid analysis
}

export type Sensitivity = 'high' | 'medium' | 'low';

export enum AppLanguage {
  EN = 'English',
  KO = 'Korean',
  JA = 'Japanese',
  ZH = 'Chinese',
  ES = 'Spanish',
  FR = 'French',
  HI = 'Hindi'
}

export interface AppState {
  isSessionActive: boolean;
  language: AppLanguage;
  apiKey: string | null;
  sensitivity: Sensitivity;
}
