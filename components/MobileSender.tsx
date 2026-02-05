import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { Wifi, WifiOff, RefreshCw, Smartphone, AlertCircle } from 'lucide-react';
import { PEER_CONFIG } from '../utils/peerConfig';

interface MobileSenderProps {
  hostId: string;
}

const MobileSender: React.FC<MobileSenderProps> = ({ hostId }) => {
  const [status, setStatus] = useState<'init' | 'connecting' | 'streaming' | 'error'>('init');
  const [errorMsg, setErrorMsg] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);

  useEffect(() => {
    // Prevent double execution in strict mode
    const cleanup = () => {
        if (peerRef.current) {
            peerRef.current.destroy();
            peerRef.current = null;
        }
    };

    initializeStream();

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostId]);

  const initializeStream = async () => {
    try {
      setStatus('connecting');

      // 1. Browser Capability Check
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in this browser context. Ensure you are using HTTPS.");
      }
      
      // 2. Get Camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
            facingMode: 'environment', 
            width: { ideal: 640 },
            height: { ideal: 480 }
        },
        audio: false 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.error("Video play error:", e));
      }

      // 3. Connect to PeerJS Cloud with STUN servers
      const peer = new Peer(PEER_CONFIG);
      peerRef.current = peer;

      peer.on('open', (id) => {
        console.log('Mobile Sender ID:', id);
        // 4. Call the Host Dashboard
        const call = peer.call(hostId, stream);
        
        if (!call) {
             throw new Error("Failed to initiate connection. Host ID might be invalid.");
        }

        call.on('close', () => {
            console.warn("Call closed by remote");
            setStatus('error');
            setErrorMsg('Dashboard connection closed.');
        });

        call.on('error', (err) => {
             console.error('Call Error:', err);
             setStatus('error');
             setErrorMsg('Transmission failed: ' + err.message);
        });
        
        // Assume connected if no immediate error
        setTimeout(() => setStatus('streaming'), 1500);
      });

      peer.on('error', (err) => {
        console.error('Peer Error:', err);
        setStatus('error');
        setErrorMsg('Network connection failed. ' + (err.type || err.message));
      });

    } catch (err: any) {
      console.error('Initialization Error:', err);
      setStatus('error');
      // Friendly error messages
      let msg = err.message || "Unknown error";
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          msg = "Camera permission denied. Please allow access in browser settings.";
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          msg = "No camera found on this device.";
      }
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {status === 'streaming' && (
        <div className="absolute top-6 left-6 z-20 bg-green-500/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center shadow-lg animate-pulse">
            <Wifi className="w-4 h-4 mr-2" /> LIVE
        </div>
      )}

      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
        <video 
            ref={videoRef} 
            className="w-full h-full object-cover" 
            muted 
            playsInline 
            autoPlay 
        />
        
        {/* Overlay Status */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            {status === 'connecting' && (
                <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-white animate-fade-in">
                    <RefreshCw className="w-10 h-10 mb-4 animate-spin text-indigo-400" />
                    <p className="text-lg font-semibold">Connecting to Class...</p>
                    <p className="text-sm text-slate-300 mt-2">Initializing Camera & Network</p>
                </div>
            )}
            
            {status === 'error' && (
                <div className="bg-slate-900/95 backdrop-blur-md p-8 rounded-2xl text-red-400 flex flex-col items-center text-center max-w-sm mx-4 border border-red-500/30 pointer-events-auto shadow-2xl">
                    <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
                    <p className="font-bold text-xl mb-2 text-white">Connection Issue</p>
                    <p className="text-sm mb-6 text-slate-300 leading-relaxed">{errorMsg}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg w-full"
                    >
                        Tap to Retry
                    </button>
                </div>
            )}

            {status === 'streaming' && (
                <div className="absolute bottom-12 bg-black/50 backdrop-blur px-4 py-2 rounded-lg text-white/80 text-sm flex items-center border border-white/10">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Transmitting to Dashboard
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MobileSender;