import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type CallStatus = 'calling' | 'connected' | 'ended';
type CallType = 'audio' | 'video';

interface CallWindowProps {
  contactName: string;
  callType: CallType;
  onEndCall: () => void;
}

const CallWindow = ({ contactName, callType, onEndCall }: CallWindowProps) => {
  const [status, setStatus] = useState<CallStatus>('calling');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === 'video');
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setStatus('connected');
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (status === 'connected') {
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setStatus('ended');
    setTimeout(onEndCall, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gradient-purple via-gradient-magenta to-gradient-blue flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md p-8 text-center">
        <div className="mb-8">
          <Avatar className="w-32 h-32 mx-auto border-4 border-white/30 mb-4 animate-pulse-scale">
            <AvatarFallback className="gradient-purple-blue text-white text-4xl font-bold">
              {contactName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-3xl font-montserrat font-bold text-white mb-2">
            {contactName}
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-white/90">
            {callType === 'video' && <Icon name="Video" size={20} />}
            {callType === 'audio' && <Icon name="Phone" size={20} />}
            <span className="text-lg">
              {status === 'calling' && 'Звоним...'}
              {status === 'connected' && formatDuration(duration)}
              {status === 'ended' && 'Звонок завершён'}
            </span>
          </div>
        </div>

        {callType === 'video' && isVideoEnabled && (
          <div className="mb-6 aspect-video bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center">
            <Icon name="User" className="text-white/50" size={64} />
          </div>
        )}

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-red-500/80' : 'bg-white/20'
            } hover:bg-white/30`}
          >
            <Icon name={isMuted ? 'MicOff' : 'Mic'} className="text-white" size={24} />
          </button>

          {callType === 'video' && (
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                !isVideoEnabled ? 'bg-red-500/80' : 'bg-white/20'
              } hover:bg-white/30`}
            >
              <Icon name={isVideoEnabled ? 'Video' : 'VideoOff'} className="text-white" size={24} />
            </button>
          )}

          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isSpeakerOn ? 'bg-white/30' : 'bg-white/20'
            } hover:bg-white/30`}
          >
            <Icon name="Volume2" className="text-white" size={24} />
          </button>
        </div>

        <button
          onClick={handleEndCall}
          className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all shadow-lg"
        >
          <Icon name="PhoneOff" className="text-white" size={32} />
        </button>
      </div>
    </div>
  );
};

export default CallWindow;
