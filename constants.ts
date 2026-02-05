import { AppLanguage } from './types';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', value: AppLanguage.EN },
  { code: 'ko', label: '한국어 (Korean)', value: AppLanguage.KO },
  { code: 'ja', label: '日本語 (Japanese)', value: AppLanguage.JA },
  { code: 'zh', label: '中文 (Chinese)', value: AppLanguage.ZH },
  { code: 'es', label: 'Español (Spanish)', value: AppLanguage.ES },
  { code: 'fr', label: 'Français (French)', value: AppLanguage.FR },
  { code: 'hi', label: 'हिन्दी (Hindi)', value: AppLanguage.HI },
];

export const MODEL_NAME = 'gemini-3-flash-preview';

// UI Translations
export const TRANSLATIONS = {
  [AppLanguage.EN]: {
    title: "Live Classroom Copilot",
    startSession: "Start Session",
    stopSession: "Stop Session",
    enterKey: "Enter Gemini API Key",
    connecting: "Connecting...",
    scanQR: "Scan to Connect Camera",
    waitingForPhone: "Waiting for mobile connection...",
    monitoring: "Monitoring Active",
    minimalMode: "Quiet Mode",
    showStats: "Show Dashboard",
    hideStats: "Hide Dashboard",
    insight: "Copilot Insight",
    action: "Recommended Action",
    engagement: "Engagement",
    load: "Cognitive Load",
    mood: "Mood",
    cameraActive: "Camera Active",
    privacyActive: "Privacy Shield Active",
    statusGreen: "Class is flowing well",
    statusYellow: "Attention Needed",
    statusRed: "Intervention Required"
  },
  [AppLanguage.KO]: {
    title: "실시간 교실 코파일럿",
    startSession: "세션 시작",
    stopSession: "세션 종료",
    enterKey: "Gemini API 키 입력",
    connecting: "연결 중...",
    scanQR: "카메라 연결을 위해 스캔하세요",
    waitingForPhone: "모바일 연결 대기 중...",
    monitoring: "모니터링 중",
    minimalMode: "집중 모드",
    showStats: "대시보드 보기",
    hideStats: "대시보드 숨기기",
    insight: "AI 인사이트",
    action: "추천 행동",
    engagement: "참여도",
    load: "인지 부하",
    mood: "분위기",
    cameraActive: "카메라 작동 중",
    privacyActive: "프라이버시 보호 중",
    statusGreen: "수업이 원활합니다",
    statusYellow: "주의가 필요합니다",
    statusRed: "개입이 필요합니다"
  },
  [AppLanguage.JA]: {
    title: "ライブ教室コパイロット",
    startSession: "セッション開始",
    stopSession: "セッション終了",
    enterKey: "Gemini APIキーを入力",
    connecting: "接続中...",
    scanQR: "カメラ接続のためにスキャン",
    waitingForPhone: "モバイル接続待機中...",
    monitoring: "監視中",
    minimalMode: "集中モード",
    showStats: "ダッシュボード表示",
    hideStats: "ダッシュボード非表示",
    insight: "AIインサイト",
    action: "推奨アクション",
    engagement: "エンゲージメント",
    load: "認知負荷",
    mood: "雰囲気",
    cameraActive: "カメラ動作中",
    privacyActive: "プライバシー保護中",
    statusGreen: "順調に進行中",
    statusYellow: "注意が必要です",
    statusRed: "介入が必要です"
  },
  [AppLanguage.ZH]: {
    title: "实时课堂助手",
    startSession: "开始会话",
    stopSession: "停止会话",
    enterKey: "输入 Gemini API 密钥",
    connecting: "连接中...",
    scanQR: "扫描连接摄像头",
    waitingForPhone: "等待手机连接...",
    monitoring: "监控中",
    minimalMode: "专注模式",
    showStats: "显示仪表板",
    hideStats: "隐藏仪表板",
    insight: "AI 洞察",
    action: "建议行动",
    engagement: "参与度",
    load: "认知负荷",
    mood: "氛围",
    cameraActive: "摄像头工作中",
    privacyActive: "隐私保护已激活",
    statusGreen: "课堂进行顺利",
    statusYellow: "需要注意",
    statusRed: "需要干预"
  },
  [AppLanguage.ES]: {
    title: "Copiloto de Aula en Vivo",
    startSession: "Iniciar Sesión",
    stopSession: "Detener Sesión",
    enterKey: "Clave API de Gemini",
    connecting: "Conectando...",
    scanQR: "Escanear para conectar cámara",
    waitingForPhone: "Esperando conexión móvil...",
    monitoring: "Monitoreo Activo",
    minimalMode: "Modo Silencioso",
    showStats: "Mostrar Panel",
    hideStats: "Ocultar Panel",
    insight: "Perspectiva AI",
    action: "Acción Recomendada",
    engagement: "Participación",
    load: "Carga Cognitiva",
    mood: "Ambiente",
    cameraActive: "Cámara Activa",
    privacyActive: "Escudo de Privacidad",
    statusGreen: "La clase fluye bien",
    statusYellow: "Atención Necesaria",
    statusRed: "Intervención Requerida"
  },
  [AppLanguage.FR]: {
    title: "Copilote de Classe en Direct",
    startSession: "Démarrer Session",
    stopSession: "Arrêter Session",
    enterKey: "Clé API Gemini",
    connecting: "Connexion...",
    scanQR: "Scanner pour connecter la caméra",
    waitingForPhone: "En attente du mobile...",
    monitoring: "Surveillance Active",
    minimalMode: "Mode Silencieux",
    showStats: "Voir Tableau de Bord",
    hideStats: "Masquer Tableau de Bord",
    insight: "Aperçu IA",
    action: "Action Recommandée",
    engagement: "Engagement",
    load: "Charge Cognitive",
    mood: "Ambiance",
    cameraActive: "Caméra Active",
    privacyActive: "Protection Vie Privée",
    statusGreen: "Le cours se déroule bien",
    statusYellow: "Attention Requise",
    statusRed: "Intervention Requise"
  },
  [AppLanguage.HI]: {
    title: "लाइव क्लासरूम कोपायलट",
    startSession: "सत्र शुरू करें",
    stopSession: "सत्र रोकें",
    enterKey: "जेमिनी API कुंजी दर्ज करें",
    connecting: "कनेक्ट हो रहा है...",
    scanQR: "कैमरा कनेक्ट करने के लिए स्कैन करें",
    waitingForPhone: "मोबाइल कनेक्शन की प्रतीक्षा है...",
    monitoring: "निगरानी सक्रिय",
    minimalMode: "शांत मोड",
    showStats: "डैशबोर्ड दिखाएं",
    hideStats: "डैशबोर्ड छिपाएं",
    insight: "AI अंतर्दृष्टि",
    action: "अनुशंसित कार्रवाई",
    engagement: "जुड़ाव",
    load: "संज्ञानात्मक भार",
    mood: "मनोदशा",
    cameraActive: "कैमरा सक्रिय",
    privacyActive: "गोपनीयता शील्ड सक्रिय",
    statusGreen: "कक्षा अच्छी चल रही है",
    statusYellow: "ध्यान देने की आवश्यकता है",
    statusRed: "हस्तक्षेप आवश्यक"
  }
};

export const SYSTEM_PROMPT_TEMPLATE = `
You are an Expert Pedagogical Consultant.
Analyze the provided blurred classroom frame.
Output strictly in valid JSON format.
Your response language must be: {{LANGUAGE}}.

**Analysis Goals:**
- **Engagement**: (0-100)
- **Cognitive Load**: (0-100) High load means confusion/stress. Low load means boredom/relaxation.
- **Mood**: One word summary.
- **Insight**: A single sentence observation.
- **Action**: A concrete, short pedagogical advice for the teacher.
- **Alert Level**: 
  - 'green' (Everything is fine, students are learning)
  - 'yellow' (Minor distraction, chatting, or slight confusion)
  - 'red' (Sleeping, chaos, fighting, or complete disengagement)

**Output Schema:**
{
  "engagement": number,
  "cognitiveLoad": number,
  "mood": string,
  "insight": string,
  "action": string,
  "alertLevel": "green" | "yellow" | "red"
}
`;