import { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface NotificationProps {
  id: string;
  contactName: string;
  message: string;
  onClose: (id: string) => void;
  onClick: () => void;
}

const NotificationToast = ({ id, contactName, message, onClose, onClick }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      onClick={onClick}
      className="glass-effect border border-white/30 rounded-2xl p-4 shadow-2xl cursor-pointer hover:bg-white/20 transition-all animate-slide-in-right max-w-sm"
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12 border-2 border-white/30">
          <AvatarFallback className="gradient-purple-magenta text-white font-semibold">
            {contactName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-semibold text-white truncate">{contactName}</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              className="p-1 hover:bg-white/10 rounded transition-all"
            >
              <Icon name="X" className="text-white/70" size={16} />
            </button>
          </div>
          <p className="text-sm text-white/90 line-clamp-2">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
