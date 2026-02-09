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

export const MODEL_NAME = 'gemini-2.5-flash';

// UI Translations
export const TRANSLATIONS = {
  [AppLanguage.EN]: {
    title: "Live Classroom Copilot",
    startSession: "Start Session",
    stopSession: "Stop Session",
    tryDemo: "Try Demo Mode",
    enterKey: "Enter Gemini API Key (Optional for Demo)",
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
    statusRed: "Intervention Required",
    demoBadge: "Simulated Demo",
    smartAssistant: "Smart Assistant",
    zoneGrid: "Zone Analysis",
    sensitivity: "Sensitivity",
    sensitivityHigh: "High",
    sensitivityMedium: "Medium",
    sensitivityLow: "Low",
    actionQuiz: "Quick Quiz",
    actionMotivate: "Motivate",
    actionStretch: "Stretch Break",
    actionCards: "Action Cards",
    batteryLevel: "Battery",
    angleGuide: "Angle Guide",
    streaming: "Streaming",
    tiltUp: "Tilt phone slightly upward"
  },
  [AppLanguage.KO]: {
    title: "실시간 교실 코파일럿",
    startSession: "세션 시작",
    stopSession: "세션 종료",
    tryDemo: "데모 체험하기",
    enterKey: "Gemini API 키 입력 (데모 시 불필요)",
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
    statusRed: "개입이 필요합니다",
    demoBadge: "시뮬레이션 모드",
    smartAssistant: "스마트 어시스턴트",
    zoneGrid: "구역 분석",
    sensitivity: "감도",
    sensitivityHigh: "높음",
    sensitivityMedium: "보통",
    sensitivityLow: "낮음",
    actionQuiz: "즉석 퀴즈",
    actionMotivate: "동기부여",
    actionStretch: "스트레칭",
    actionCards: "액션 카드",
    batteryLevel: "배터리",
    angleGuide: "각도 안내",
    streaming: "스트리밍 중",
    tiltUp: "폰을 약간 위로 기울이세요"
  },
  [AppLanguage.JA]: {
    title: "ライブ教室コパイロット",
    startSession: "セッション開始",
    stopSession: "セッション終了",
    tryDemo: "デモを試す",
    enterKey: "Gemini APIキー (デモは不要)",
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
    statusRed: "介入が必要です",
    demoBadge: "シミュレーション",
    smartAssistant: "スマートアシスタント",
    zoneGrid: "ゾーン分析",
    sensitivity: "感度",
    sensitivityHigh: "高",
    sensitivityMedium: "中",
    sensitivityLow: "低",
    actionQuiz: "クイック クイズ",
    actionMotivate: "モチベーション",
    actionStretch: "ストレッチ",
    actionCards: "アクションカード",
    batteryLevel: "バッテリー",
    angleGuide: "角度ガイド",
    streaming: "ストリーミング中",
    tiltUp: "スマホを少し上に傾けてください"
  },
  [AppLanguage.ZH]: {
    title: "实时课堂助手",
    startSession: "开始会话",
    stopSession: "停止会话",
    tryDemo: "试用演示模式",
    enterKey: "Gemini API 密钥 (演示无需)",
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
    statusRed: "需要干预",
    demoBadge: "模拟演示",
    smartAssistant: "智能助手",
    zoneGrid: "区域分析",
    sensitivity: "灵敏度",
    sensitivityHigh: "高",
    sensitivityMedium: "中",
    sensitivityLow: "低",
    actionQuiz: "快速测验",
    actionMotivate: "激励",
    actionStretch: "伸展休息",
    actionCards: "操作卡",
    batteryLevel: "电池",
    angleGuide: "角度指南",
    streaming: "传输中",
    tiltUp: "请将手机稍微向上倾斜"
  },
  [AppLanguage.ES]: {
    title: "Copiloto de Aula en Vivo",
    startSession: "Iniciar Sesión",
    stopSession: "Detener Sesión",
    tryDemo: "Probar Demo",
    enterKey: "Clave API (Opcional)",
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
    statusRed: "Intervención Requerida",
    demoBadge: "Modo Simulado",
    smartAssistant: "Asistente Inteligente",
    zoneGrid: "Análisis de Zonas",
    sensitivity: "Sensibilidad",
    sensitivityHigh: "Alta",
    sensitivityMedium: "Media",
    sensitivityLow: "Baja",
    actionQuiz: "Quiz Rápido",
    actionMotivate: "Motivar",
    actionStretch: "Pausa Activa",
    actionCards: "Tarjetas de Acción",
    batteryLevel: "Batería",
    angleGuide: "Guía de Ángulo",
    streaming: "Transmitiendo",
    tiltUp: "Inclina el teléfono ligeramente hacia arriba"
  },
  [AppLanguage.FR]: {
    title: "Copilote de Classe en Direct",
    startSession: "Démarrer Session",
    stopSession: "Arrêter Session",
    tryDemo: "Mode Démo",
    enterKey: "Clé API (Optionnel)",
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
    statusRed: "Intervention Requise",
    demoBadge: "Simulation",
    smartAssistant: "Assistant Intelligent",
    zoneGrid: "Analyse des Zones",
    sensitivity: "Sensibilité",
    sensitivityHigh: "Haute",
    sensitivityMedium: "Moyenne",
    sensitivityLow: "Basse",
    actionQuiz: "Quiz Rapide",
    actionMotivate: "Motiver",
    actionStretch: "Pause Étirement",
    actionCards: "Cartes d'Action",
    batteryLevel: "Batterie",
    angleGuide: "Guide d'Angle",
    streaming: "En diffusion",
    tiltUp: "Inclinez légèrement le téléphone vers le haut"
  },
  [AppLanguage.HI]: {
    title: "लाइव क्लासरूम कोपायलट",
    startSession: "सत्र शुरू करें",
    stopSession: "सत्र रोकें",
    tryDemo: "डेमो आज़माएं",
    enterKey: "API कुंजी (वैकल्पिक)",
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
    statusRed: "हस्तक्षेप आवश्यक",
    demoBadge: "सिमुलेशन मोड",
    smartAssistant: "स्मार्ट सहायक",
    zoneGrid: "ज़ोन विश्लेषण",
    sensitivity: "संवेदनशीलता",
    sensitivityHigh: "उच्च",
    sensitivityMedium: "मध्यम",
    sensitivityLow: "निम्न",
    actionQuiz: "त्वरित प्रश्नोत्तरी",
    actionMotivate: "प्रेरित करें",
    actionStretch: "स्ट्रेचिंग ब्रेक",
    actionCards: "एक्शन कार्ड",
    batteryLevel: "बैटरी",
    angleGuide: "कोण गाइड",
    streaming: "स्ट्रीमिंग",
    tiltUp: "फ़ोन को थोड़ा ऊपर झुकाएं"
  }
};

export const SYSTEM_PROMPT_TEMPLATE = `
You are an Expert Pedagogical Consultant analyzing a classroom via a blurred privacy-processed frame.
Output strictly in valid JSON format.
Your response language must be: {{LANGUAGE}}.

**Analysis Framework:**

1. **Overall Metrics:**
   - **Engagement**: (0-100) Overall class engagement level.
   - **Cognitive Load**: (0-100) High = confusion/stress, Low = boredom/relaxation.
   - **Mood**: One word summary of classroom atmosphere.

2. **9-Zone Grid Analysis:**
   Divide the frame into a 3x3 grid (zones 1-9, left-to-right, top-to-bottom).
   For each zone, estimate:
   - **engagement**: (0-100) engagement level for that zone.
   - **behavior**: One of: "focused", "note-taking", "distracted", "chatting", "phone-use", "sleeping", "confused", "empty"

3. **Behavior Patterns to Detect:**
   - Focused: Forward gaze, note-taking posture
   - Attention needed: Chin resting, 5+ seconds gaze away, head down (drowsy)
   - Intervention needed: Talking to neighbor (head turned), phone use, sleeping

4. **Strategy Suggestion:**
   - **Insight**: A specific observation mentioning the zone number if applicable.
   - **Action**: A concrete, actionable pedagogical advice. Examples:
     "Zone 7-9 engagement dropping, suggest 30-second stretch break"
     "Overall attention below 40%, recommend switching to quiz mode"
   - **Alert Level**:
     - 'green': Learning is active
     - 'yellow': Minor distraction, chatting, slight confusion
     - 'red': Sleeping, chaos, complete disengagement

**Sensitivity Level: {{SENSITIVITY}}**
- high: Flag even minor distractions as yellow
- medium: Standard threshold
- low: Only flag significant disturbances

**Output Schema:**
{
  "engagement": number,
  "cognitiveLoad": number,
  "mood": string,
  "zones": [
    {"zone": 1, "engagement": number, "behavior": string},
    {"zone": 2, "engagement": number, "behavior": string},
    ...
    {"zone": 9, "engagement": number, "behavior": string}
  ],
  "insight": string,
  "action": string,
  "alertLevel": "green" | "yellow" | "red"
}
`;

// Mock Scenarios for Demo Mode (Looping sequence with zone data)
export const MOCK_SCENARIOS = [
  {
    engagement: 85,
    cognitiveLoad: 40,
    mood: "Focused",
    alertLevel: "green",
    insight: "Students are attentively listening to the lecture.",
    action: "Great time to introduce a key concept.",
    zones: [
      { zone: 1, engagement: 90, behavior: "focused" },
      { zone: 2, engagement: 85, behavior: "note-taking" },
      { zone: 3, engagement: 80, behavior: "focused" },
      { zone: 4, engagement: 88, behavior: "focused" },
      { zone: 5, engagement: 92, behavior: "note-taking" },
      { zone: 6, engagement: 78, behavior: "focused" },
      { zone: 7, engagement: 82, behavior: "focused" },
      { zone: 8, engagement: 85, behavior: "note-taking" },
      { zone: 9, engagement: 88, behavior: "focused" }
    ]
  },
  {
    engagement: 70,
    cognitiveLoad: 60,
    mood: "Curious",
    alertLevel: "green",
    insight: "Some students are taking notes, good flow.",
    action: "Maintain this pace.",
    zones: [
      { zone: 1, engagement: 75, behavior: "note-taking" },
      { zone: 2, engagement: 80, behavior: "focused" },
      { zone: 3, engagement: 65, behavior: "focused" },
      { zone: 4, engagement: 72, behavior: "note-taking" },
      { zone: 5, engagement: 68, behavior: "focused" },
      { zone: 6, engagement: 70, behavior: "note-taking" },
      { zone: 7, engagement: 60, behavior: "focused" },
      { zone: 8, engagement: 75, behavior: "note-taking" },
      { zone: 9, engagement: 65, behavior: "focused" }
    ]
  },
  {
    engagement: 55,
    cognitiveLoad: 30,
    mood: "Restless",
    alertLevel: "yellow",
    insight: "Zone 7-9: Attention drifting in back rows.",
    action: "Try asking a question to re-engage the back of the class.",
    zones: [
      { zone: 1, engagement: 70, behavior: "focused" },
      { zone: 2, engagement: 72, behavior: "note-taking" },
      { zone: 3, engagement: 65, behavior: "focused" },
      { zone: 4, engagement: 58, behavior: "focused" },
      { zone: 5, engagement: 55, behavior: "distracted" },
      { zone: 6, engagement: 50, behavior: "distracted" },
      { zone: 7, engagement: 35, behavior: "chatting" },
      { zone: 8, engagement: 40, behavior: "distracted" },
      { zone: 9, engagement: 30, behavior: "phone-use" }
    ]
  },
  {
    engagement: 40,
    cognitiveLoad: 20,
    mood: "Bored",
    alertLevel: "yellow",
    insight: "Energy level has dropped significantly across all zones.",
    action: "Time for a quick stretch or an interactive activity.",
    zones: [
      { zone: 1, engagement: 45, behavior: "distracted" },
      { zone: 2, engagement: 50, behavior: "focused" },
      { zone: 3, engagement: 38, behavior: "distracted" },
      { zone: 4, engagement: 42, behavior: "distracted" },
      { zone: 5, engagement: 35, behavior: "chatting" },
      { zone: 6, engagement: 30, behavior: "phone-use" },
      { zone: 7, engagement: 25, behavior: "sleeping" },
      { zone: 8, engagement: 40, behavior: "distracted" },
      { zone: 9, engagement: 35, behavior: "chatting" }
    ]
  },
  {
    engagement: 80,
    cognitiveLoad: 75,
    mood: "Intense",
    alertLevel: "green",
    insight: "Students are working hard on the problem set.",
    action: "Walk around and offer individual support.",
    zones: [
      { zone: 1, engagement: 85, behavior: "note-taking" },
      { zone: 2, engagement: 82, behavior: "focused" },
      { zone: 3, engagement: 78, behavior: "note-taking" },
      { zone: 4, engagement: 80, behavior: "focused" },
      { zone: 5, engagement: 88, behavior: "note-taking" },
      { zone: 6, engagement: 75, behavior: "confused" },
      { zone: 7, engagement: 72, behavior: "note-taking" },
      { zone: 8, engagement: 80, behavior: "focused" },
      { zone: 9, engagement: 78, behavior: "note-taking" }
    ]
  },
  {
    engagement: 30,
    cognitiveLoad: 80,
    mood: "Confused",
    alertLevel: "red",
    insight: "Zone 4-6: Many students look puzzled by the last explanation.",
    action: "Pause and re-explain the concept with a simpler example.",
    zones: [
      { zone: 1, engagement: 40, behavior: "confused" },
      { zone: 2, engagement: 35, behavior: "confused" },
      { zone: 3, engagement: 45, behavior: "distracted" },
      { zone: 4, engagement: 20, behavior: "confused" },
      { zone: 5, engagement: 25, behavior: "confused" },
      { zone: 6, engagement: 18, behavior: "sleeping" },
      { zone: 7, engagement: 30, behavior: "chatting" },
      { zone: 8, engagement: 28, behavior: "phone-use" },
      { zone: 9, engagement: 22, behavior: "sleeping" }
    ]
  }
];