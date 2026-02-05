import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { Camera, Wifi, WifiOff, RefreshCw, Smartphone } from 'lucide-react';
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
    initializeStream();
    return () => {
        peerRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostId]);

  const initializeStream = async () => {
    try {
      setStatus('connecting');
      
      // 1. Get Camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 } },
        audio: false 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // 2. Connect to PeerJS Cloud with STUN servers
      const peer = new Peer(PEER_CONFIG);
      peerRef.current = peer;

      peer.on('open', (id) => {
        console.log('Mobile Sender ID:', id);
        // 3. Call the Host Dashboard
        const call = peer.call(hostId, stream);
        
        // Wait for connection to be stable
        call.on('close', () => {
            setStatus('error');
            setErrorMsg('Dashboard connection closed.');
        });

        call.on('error', (err) => {
             console.error('Call Error:', err);
             setStatus('error');
             setErrorMsg('Transmission failed.');
        });
        
        // Assume connected after a short delay if no errors
        setTimeout(() => setStatus('streaming'), 1500);
      });

      peer.on('error', (err) => {
        console.error('Peer Error:', err);
        setStatus('error');
        setErrorMsg('Network connection failed. ' + err.message);
      });

    } catch (err) {
      console.error('Camera Error:', err);
      setStatus('error');
      setErrorMsg('Camera access denied. Please allow camera permissions in your browser settings.');
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
      <div className="relative w-full h-full flex items-center justify-center">
        <video 
            ref={videoRef} 
            className="w-full h-full object-cover" 
            muted 
            playsInline 
            autoPlay 
        />
        
        {/* Overlay Status */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {status === 'connecting' && (
                <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-white animate-fade-in">
                    <RefreshCw className="w-10 h-10 mb-4 animate-spin text-indigo-400" />
                    <p className="text-lg font-semibold">Connecting to Class...</p>
                    <p className="text-sm text-slate-300 mt-2">Please wait a moment</p>
                </div>
            )}
            
            {status === 'error' && (
                <div className="bg-slate-900/90 backdrop-blur-md p-8 rounded-2xl text-red-400 flex flex-col items-center text-center max-w-xs mx-4 border border-red-500/30">
                    <WifiOff className="w-12 h-12 mb-4" />
                    <p className="font-bold text-xl mb-2 text-white">Connection Issue</p>
                    <p className="text-sm mb-6">{errorMsg}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="pointer-events-auto bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95"
                    >
                        Retry Connection
                    </button>
                </div>
            )}

            {status === 'streaming' && (
                <div className="absolute bottom-12 bg-black/50 backdrop-blur px-4 py-2 rounded-lg text-white/80 text-sm flex items-center">
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