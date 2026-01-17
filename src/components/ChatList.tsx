import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    avatar: '',
    lastMessage: 'Привет! Как дела?',
    time: '14:32',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Дмитрий Иванов',
    avatar: '',
    lastMessage: 'Посмотри это фото',
    time: '13:15',
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: 'Мария Петрова',
    avatar: '',
    lastMessage: 'Спасибо за помощь!',
    time: '11:20',
    unread: 1,
    online: false
  },
  {
    id: 4,
    name: 'Алексей Козлов',
    avatar: '',
    lastMessage: 'До встречи завтра',
    time: 'Вчера',
    unread: 0,
    online: false
  },
  {
    id: 5,
    name: 'Елена Новикова',
    avatar: '',
    lastMessage: 'Отличная идея! 👍',
    time: 'Вчера',
    unread: 0,
    online: true
  }
];

interface ChatListProps {
  onSelectChat: (chatId: number) => void;
  selectedChatId: number | null;
}

const ChatList = ({ onSelectChat, selectedChatId }: ChatListProps) => {
  return (
    <div className="w-full md:w-96 glass-effect border-r border-white/20 flex flex-col">
      <div className="p-4 border-b border-white/20">
        <input
          type="text"
          placeholder="Поиск..."
          className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full p-3 rounded-xl mb-2 transition-all hover:bg-white/10 ${
                selectedChatId === chat.id ? 'bg-white/20' : ''
              } animate-fade-in`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12 border-2 border-white/30">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className="gradient-purple-magenta text-white font-semibold">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white/50 animate-pulse-scale" />
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white">{chat.name}</h3>
                    <span className="text-xs text-white/70">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/80 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="ml-2 bg-gradient-magenta-blue text-white border-0">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatList;
