import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  status?: 'sent' | 'delivered' | 'read';
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
}

const ChatWindow = ({ chatId, onClose }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [isTyping] = useState(false);

  const chatName = 'Анна Смирнова';
  const isOnline = true;

  return (
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
          <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <Icon name="Phone" className="text-white" size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <Icon name="Video" className="text-white" size={20} />
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg) => (
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
                <p className="text-sm">{msg.text}</p>
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
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <Icon name="Paperclip" className="text-white" size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Сообщение..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
          <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <Icon name="Smile" className="text-white" size={20} />
          </button>
          <button className="px-4 py-2 gradient-purple-magenta rounded-xl hover:opacity-90 transition-all">
            <Icon name="Send" className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
