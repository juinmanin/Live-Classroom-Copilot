import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ShieldCheck, Activity, Smartphone, Signal } from 'lucide-react';
import Peer from 'peerjs';
import { GeminiService } from '../services/geminiService';
import { AppLanguage, AIAnalysisResult } from '../types';
import { TRANSLATIONS } from '../constants';
import { PEER_CONFIG } from '../utils/peerConfig';

interface LiveMonitorProps {
  isActive: boolean;
  apiKey: string;
  language: AppLanguage;
  onAnalysisComplete: (result: AIAnalysisResult) => void;
  onPeerIdGenerated: (id: string) => void;
}

const LiveMonitor: React.FC<LiveMonitorProps> = ({
  isActive,
  apiKey,
  language,
  onAnalysisComplete,
  onPeerIdGenerated
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'waiting' | 'connected'>('disconnected');

  // 1. Initialize Gemini Service (also for demo mode without API key)
  useEffect(() => {
    setGeminiService(new GeminiService(apiKey));
  }, [apiKey]);

  // 2. Initialize PeerJS (Receiver) with STUN Config
  useEffect(() => {
    if (isActive && !peer) {
        const newPeer = new Peer(PEER_CONFIG);
        
        newPeer.on('open', (id) => {
            console.log('Dashboard Peer ID:', id);
            onPeerIdGenerated(id);
            setConnectionStatus('waiting');
        });

        newPeer.on('call', (call) => {
            console.log('Receiving call from mobile...');
            call.answer(); // Answer automatically
            call.on('stream', (stream) => {
                console.log('Stream received');
                setRemoteStream(stream);
                setConnectionStatus('connected');
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            });
        });
        
        newPeer.on('error', (err) => {
            console.error('Peer Server Error:', err);
        });

        setPeer(newPeer);
    } else if (!isActive && peer) {
        peer.destroy();
        setPeer(null);
        setRemoteStream(null);
        setConnectionStatus('disconnected');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // 3. AI Processing Loop
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isActive && connectionStatus === 'connected' && geminiService) {
      intervalId = setInterval(() => {
        processFrame();
      }, 5000); 
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, connectionStatus, geminiService, language]);

  const processFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !geminiService || isProcessing) return;

    setIsProcessing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Draw frame
    canvas.width = 320; 
    canvas.height = 240;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply Privacy Blur
    ctx.filter = 'blur(8px)'; 
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';

    const base64Image = canvas.toDataURL('image/jpeg', 0.6).split(',')[1];

    try {
      const result = await geminiService.analyzeFrame(
        base64Image,
        language,
        "Class session running."
      );
      onAnalysisComplete(result);
    } catch (err) {
      console.error("Analysis loop error:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [geminiService, isProcessing, language, onAnalysisComplete]);

  const t = TRANSLATIONS[language];

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-500 ${remoteStream ? 'opacity-100' : 'opacity-30'}`}
      />
      
      <canvas ref={canvasRef} className="hidden" />

      {/* Connection Status Overlay */}
      {isActive && connectionStatus === 'waiting' && (
         <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 animate-pulse">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 relative">
                <Smartphone className="w-10 h-10 opacity-70" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 rounded-full animate-ping"></span>
            </div>
            <p className="text-xl font-medium text-white">{t.waitingForPhone}</p>
            <p className="text-sm mt-2 text-slate-500">Scan the QR code on the screen</p>
         </div>
      )}

      {/* Active Overlays */}
      {connectionStatus === 'connected' && (
        <>
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-3 border border-white/10 shadow-lg">
                <div className="relative flex items-center justify-center w-3 h-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </div>
                <span className="text-sm font-bold text-white tracking-wide">{t.monitoring}</span>
            </div>

            <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur text-white px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-xs font-semibold shadow-lg border border-indigo-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.privacyActive}</span>
            </div>
            
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white/50 text-xs">
                <Signal className="w-4 h-4" />
                <span>Secure P2P Connection</span>
            </div>
        </>
      )}

      {isProcessing && (
        <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center space-x-2 text-xs border border-white/20 shadow-xl transition-all">
          <Activity className="w-4 h-4 animate-spin text-blue-400" />
          <span className="font-medium">AI Analyzing...</span>
        </div>
      )}

      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-900/50">
           <div className="p-10 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center bg-slate-900/80">
             <Smartphone className="w-16 h-16 mb-4 opacity-30" />
             <p className="text-lg font-medium text-slate-400">{t.scanQR}</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default LiveMonitor;