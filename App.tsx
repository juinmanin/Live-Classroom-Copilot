import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Play, Square, Brain, AlertTriangle, ChevronDown, ChevronUp, Info, Copy, Check, Key, Sparkles, Globe
} from 'lucide-react';

import LiveMonitor from './components/LiveMonitor';
import StatCard from './components/StatCard';
import LanguageSelector from './components/LanguageSelector';
import MobileSender from './components/MobileSender';
import { AppLanguage, AIAnalysisResult, ClassroomMetrics } from './types';
import { TRANSLATIONS } from './constants';

export default function App() {
  // Routing & View Mode
  const [viewMode, setViewMode] = useState<'dashboard' | 'sender'>('dashboard');
  const [hostIdParam, setHostIdParam] = useState<string | null>(null);

  // App State
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState(false); // Toggle for API Key input
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [language, setLanguage] = useState<AppLanguage>(AppLanguage.EN);
  const [showDashboard, setShowDashboard] = useState(true); 
  const [peerId, setPeerId] = useState<string>(''); 
  const [copied, setCopied] = useState(false);
  
  // Data
  const [metricsHistory, setMetricsHistory] = useState<ClassroomMetrics[]>([]);
  const [latestAnalysis, setLatestAnalysis] = useState<AIAnalysisResult | null>(null);
  
  // Notification Toast
  const [notification, setNotification] = useState<{msg: string, type: 'red' | 'yellow' | 'green' | null} | null>(null);

  useEffect(() => {
    // Check URL parameters for Sender Mode
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    const id = params.get('id');

    if (role === 'sender' && id) {
        setViewMode('sender');
        setHostIdParam(id);
    }
  }, []);

  // Safe URL Generation
  const connectionUrl = useMemo(() => {
    if (!peerId) return '';
    try {
        const url = new URL(window.location.href);
        url.searchParams.set('role', 'sender');
        url.searchParams.set('id', peerId);
        return url.toString();
    } catch (e) {
        return `${window.location.origin}/?role=sender&id=${peerId}`;
    }
  }, [peerId]);

  // Check if running in a private cloud environment
  const isPrivateEnv = useMemo(() => {
    const hostname = window.location.hostname;
    return hostname.includes('usercontent.goog') || 
           hostname.includes('web.app') || 
           hostname.includes('idx.dev') ||
           hostname.includes('vercel.app') ||
           hostname === 'localhost' ||
           hostname === '127.0.0.1';
  }, []);

  // Handle AI Results
  const handleAnalysisComplete = useCallback((result: AIAnalysisResult) => {
    setLatestAnalysis(result);
    
    // Update Chart History
    const newMetric: ClassroomMetrics = {
      timestamp: Date.now(),
      engagement: result.metrics.engagement || 50,
      cognitiveLoad: result.metrics.cognitiveLoad || 50,
      mood: result.metrics.mood || 'Neutral'
    };

    setMetricsHistory(prev => {
      const newHistory = [...prev, newMetric];
      return newHistory.slice(-20); 
    });

    // Trigger Notification for Events
    if (result.alertLevel === 'red' || result.alertLevel === 'yellow') {
        setNotification({
            msg: result.action,
            type: result.alertLevel
        });
        setTimeout(() => setNotification(null), 8000);
    } else {
        if (notification?.type !== 'green') setNotification(null);
    }

  }, [notification]);

  const toggleSession = () => {
    setIsSessionActive(!isSessionActive);
    if (!isSessionActive) {
        setShowDashboard(true);
        setPeerId('');
        setNotification(null);
    } else {
        setShowDashboard(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(connectionUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render Mobile Sender View (Phone)
  if (viewMode === 'sender' && hostIdParam) {
    return <MobileSender hostId={hostIdParam} />;
  }

  const t = TRANSLATIONS[language];
  const isDemoMode = !apiKey;

  // Render Dashboard View (Teacher PC)
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col transition-colors duration-500 font-sans">
      
      {/* Alert Notification Toast */}
      {notification && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] w-[90%] max-w-2xl p-4 rounded-xl shadow-2xl flex items-center animate-bounce-in border-2 ${
            notification.type === 'red' ? 'bg-red-900/90 border-red-500 text-white' : 
            notification.type === 'yellow' ? 'bg-amber-900/90 border-amber-500 text-amber-100' : 'bg-green-900/90 border-green-500'
        }`}>
            {notification.type === 'red' ? <AlertTriangle className="w-8 h-8 mr-4 animate-bounce" /> : <Info className="w-8 h-8 mr-4" />}
            <div>
                <p className="text-xs uppercase font-bold opacity-80">{t.action}</p>
                <p className="text-xl font-bold leading-tight">{notification.msg}</p>
            </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white hidden sm:block">
              {t.title} <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full ml-2">Beta</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={setLanguage}
              disabled={isSessionActive}
            />
            
            {/* Key Input Toggle */}
            {!isSessionActive && (
               <div className="relative">
                 <button 
                    onClick={() => setShowKeyInput(!showKeyInput)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                    title="Setup API Key"
                 >
                    <Key className="w-5 h-5" />
                 </button>
                 {showKeyInput && (
                    <div className="absolute top-10 right-0 bg-slate-800 border border-slate-700 p-3 rounded-xl shadow-2xl z-50 flex flex-col w-64 animate-fade-in">
                        <label className="text-xs text-slate-400 mb-1 ml-1">Google Gemini API Key</label>
                        <input 
                            type="password"
                            placeholder="Paste key for real AI..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-slate-600"
                        />
                        <p className="text-[10px] text-slate-500 mt-2 px-1">
                            Leave empty to run in <b>Simulation Mode</b>.
                        </p>
                    </div>
                 )}
               </div>
            )}

            <button
              onClick={toggleSession}
              className={`flex items-center space-x-2 px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95 ${
                isSessionActive 
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30' 
                  : apiKey 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/40 hover:shadow-indigo-500/60'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/40 hover:shadow-emerald-500/60'
              }`}
            >
              {isSessionActive ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">{t.stopSession}</span>
                </>
              ) : (
                <>
                  {apiKey ? <Play className="w-4 h-4 fill-current" /> : <Sparkles className="w-4 h-4 fill-current" />}
                  <span className="hidden sm:inline">{apiKey ? t.startSession : t.tryDemo}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Demo Mode Banner */}
      {isSessionActive && isDemoMode && (
          <div className="bg-emerald-900/30 border-b border-emerald-500/20 py-2">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.demoBadge}: Analysis is being simulated for demonstration.</span>
            </div>
          </div>
      )}

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 flex flex-col items-center">
        
        {/* Connection Panel (QR Code) - Shows only when active & not connected yet */}
        {isSessionActive && peerId && metricsHistory.length === 0 && (
            <div className="w-full bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in shadow-2xl relative overflow-hidden">
                {/* Warning for Private Env */}
                {isPrivateEnv && (
                    <div className="absolute top-0 left-0 w-full bg-amber-500/20 text-amber-200 text-xs py-1 px-4 text-center border-b border-amber-500/30 flex items-center justify-center space-x-2">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Development Environment Detected. Mobile connection may fail. Deploy to Netlify/Vercel for public access.</span>
                    </div>
                )}

                <div className="bg-white p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform mt-6 md:mt-0">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(connectionUrl)}`}
                        alt="Scan to Connect"
                        className="w-48 h-48"
                    />
                </div>
                <div className="text-center md:text-left max-w-md space-y-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t.scanQR}</h3>
                        <p className="text-slate-300">
                           Open your phone's camera and scan the code to connect.
                           <br/><span className="text-indigo-400 text-sm">No app installation required.</span>
                        </p>
                    </div>
                    
                    <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-700 flex flex-col justify-between group">
                        <code className="text-[10px] font-mono text-slate-400 break-all whitespace-pre-wrap block select-all mb-2 leading-relaxed">
                            {connectionUrl}
                        </code>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-600">Secure P2P Link</span>
                            <button 
                                onClick={copyLink}
                                className="p-2 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white flex items-center space-x-2"
                                title="Copy Link"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                <span className="text-xs">Copy URL</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-900/50 p-2 rounded w-fit">
                         <Globe className="w-3 h-3 text-green-500" />
                         <span>Ready for connection</span>
                    </div>
                </div>
            </div>
        )}

        {/* Live Monitor Feed */}
        <div className={`w-full transition-all duration-700 ease-in-out ${showDashboard ? 'h-[300px] sm:h-[400px]' : 'h-[60vh] sm:h-[70vh]'} mb-6 relative z-10`}>
            <LiveMonitor 
                isActive={isSessionActive} 
                apiKey={apiKey}
                language={language}
                onAnalysisComplete={handleAnalysisComplete}
                onPeerIdGenerated={setPeerId}
            />
        </div>

        {/* Minimal Mode Toggle */}
        {isSessionActive && (
            <button 
                onClick={() => setShowDashboard(!showDashboard)}
                className="mb-8 flex items-center space-x-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm bg-slate-900/50 border border-slate-800 px-5 py-2 rounded-full shadow-lg"
            >
                {showDashboard ? <><ChevronUp className="w-4 h-4" /><span>{t.hideStats}</span></> : <><ChevronDown className="w-4 h-4" /><span>{t.showStats}</span></>}
            </button>
        )}

        {/* Dashboard / Metrics (Collapsible) */}
        {showDashboard && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up pb-10">
                
                {/* Insights Column */}
                <div className="lg:col-span-1 space-y-4">
                    <div className={`bg-slate-800/80 backdrop-blur rounded-2xl p-6 border shadow-xl h-full flex flex-col transition-colors ${isDemoMode ? 'border-emerald-500/30' : 'border-slate-700'}`}>
                        <h3 className={`${isDemoMode ? 'text-emerald-400' : 'text-indigo-400'} text-xs font-bold uppercase tracking-wider mb-4 flex items-center`}>
                            {isDemoMode ? <Sparkles className="w-3 h-3 mr-2" /> : <Brain className="w-3 h-3 mr-2" />}
                            {t.insight}
                        </h3>
                        <p className="text-white text-lg font-medium leading-relaxed flex-grow">
                            {latestAnalysis?.insight || "Waiting for classroom data..."}
                        </p>
                        <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                            <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">{t.mood}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${isDemoMode ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'}`}>
                                {latestAnalysis?.metrics?.mood ?? '-'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Metrics & Chart Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard 
                            title={t.engagement}
                            value={latestAnalysis?.metrics?.engagement ?? 0}
                            color={isDemoMode ? "text-emerald-400" : "text-indigo-400"}
                        />
                        <StatCard 
                            title={t.load}
                            value={latestAnalysis?.metrics?.cognitiveLoad ?? 0}
                            color="text-pink-400"
                        />
                    </div>

                    <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-5 border border-slate-700 shadow-xl h-[240px]">
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Live Trends (Last 5 min)</h3>
                        <div className="h-full pb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={metricsHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                                    <XAxis dataKey="timestamp" hide />
                                    <YAxis domain={[0, 100]} hide />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }}
                                    />
                                    <Line type="monotone" dataKey="engagement" stroke={isDemoMode ? "#34d399" : "#818cf8"} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="cognitiveLoad" stroke="#f472b6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}