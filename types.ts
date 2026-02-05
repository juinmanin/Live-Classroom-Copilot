export interface ClassroomMetrics {
  timestamp: number;
  engagement: number; // 0-100
  cognitiveLoad: number; // 0-100
  mood: string;
}

export interface AIAnalysisResult {
  metrics: ClassroomMetrics;
  insight: string;
  action: string;
  alertLevel: 'green' | 'yellow' | 'red';
}

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
}
