import { useState, useRef } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import CallWindow from './CallWindow';
import EmojiPicker from './EmojiPicker';

type CallType = 'audio' | 'video' | null;

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', time: '14:30', isMine: false },
  { id: 2, text: 'Привет! Всё отлично, спасибо!', time: '14:31', isMine: true, status: 'read' },
  { id: 3, text: 'Что планируешь на выходные?', time: '14:32', isMine: false },
  { id: 4, text: 'Может встретимся?', time: '14:32', isMine: false },
  { id: 5, text: 'Да, было бы здорово! 😊', time: '14:33', isMine: true, status: 'delivered' },
];

interface ChatWindowProps {
  chatId: number;
  onClose: () => void;
  wallpaper?: string;
}

const ChatWindow = ({ chatId, onClose, wallpaper = 'default' }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [isTyping] = useState(false);
  const [activeCall, setActiveCall] = useState<CallType>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chatName = 'Анна Смирнова';
  const isOnline = true;

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newMessage: Message = {
        id: messages.length + 1,
        text: file.name,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
        status: 'sent',
        type: file.type.startsWith('image/') ? 'image' : 'file',
        fileUrl: event.target?.result as string,
        fileName: file.name
      };
      setMessages([...messages, newMessage]);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent',
      type: 'text'
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const getWallpaperStyle = () => {
    const patterns: Record<string, string> = {
      dots: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      lines: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
      grid: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      waves: 'repeating-radial-gradient(circle at 0 0, transparent 0, rgba(255,255,255,0.05) 10px, transparent 20px)'
    };
    return patterns[wallpaper] || '';
  };

  return (
    <>
      {activeCall && (
        <CallWindow
          contactName={chatName}
          callType={activeCall}
          onEndCall={() => setActiveCall(null)}
        />
      )}
      
    <div className="flex-1 flex flex-col glass-effect animate-slide-in-right">
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all">
            <Icon name="ArrowLeft" className="text-white" size={20} />
          </button>
          <Avatar className="w-10 h-10 border-2 border-white/30">
            <AvatarFallback className="gradient-purple-blue text-white font-semibold">
              АС
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-white">{chatName}</h2>
            {isOnline ? (
              <span className="text-xs text-green-300">онлайн</span>
            ) : (
              <span className="text-xs text-white/60">был(а) недавно</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveCall('audio')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <Icon name="Phone" className="text-white" size={20} />
          </button>
          <button 
            onClick={() => setActiveCall('video')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <Icon name="Video" className="text-white" size={20} />
          </button>
        </div>
      </div>

      <ScrollArea 
        className="flex-1 p-4"
        style={{
          backgroundImage: getWallpaperStyle(),
          backgroundSize: wallpaper === 'grid' ? '20px 20px' : 'auto'
        }}
      >
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                  msg.isMine
                    ? 'gradient-purple-magenta text-white rounded-br-sm'
                    : 'bg-white/20 text-white rounded-bl-sm'
                }`}
              >
                {msg.type === 'image' && msg.fileUrl && (
                  <img 
                    src={msg.fileUrl} 
                    alt={msg.fileName}
                    className="rounded-lg mb-2 max-w-full"
                  />
                )}
                {msg.type === 'file' && (
                  <div className="flex items-center gap-2 mb-2 p-2 bg-white/10 rounded-lg">
                    <Icon name="FileText" size={20} />
                    <span className="text-sm truncate">{msg.fileName}</span>
                  </div>
                )}
                {msg.type === 'text' && <p className="text-sm">{msg.text}</p>}
                <div className="flex items-center gap-1 justify-end mt-1">
                  <span className="text-xs opacity-70">{msg.time}</span>
                  {msg.isMine && msg.status === 'read' && (
                    <Icon name="CheckCheck" className="opacity-70" size={14} />
                  )}
                  {msg.isMine && msg.status === 'delivered' && (
                    <Icon name="Check" className="opacity-70" size={14} />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white/20 text-white px-4 py-2 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white/70 rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-100" />
                  <span className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/20">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="flex gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <Icon name="Paperclip" className="text-white" size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Сообщение..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
          <EmojiPicker onEmojiSelect={handleEmojiSelect}>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
              <Icon name="Smile" className="text-white" size={20} />
            </button>
          </EmojiPicker>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 py-2 gradient-purple-magenta rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Icon name="Send" className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatWindow;