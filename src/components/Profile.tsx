import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Status {
  id: number;
  text: string;
  emoji: string;
  timestamp: string;
  expiresIn: string;
}

const mockStatuses: Status[] = [
  {
    id: 1,
    text: 'На работе',
    emoji: '💼',
    timestamp: '2 часа назад',
    expiresIn: '22ч'
  },
  {
    id: 2,
    text: 'Хорошее настроение',
    emoji: '😊',
    timestamp: '5 часов назад',
    expiresIn: '19ч'
  }
];

const Profile = () => {
  const userData = {
    name: 'Вы',
    phone: '+7 (999) 123-45-67',
    bio: 'Люблю путешествия и фотографию 📸',
    username: '@myusername'
  };

  return (
    <div className="flex-1 glass-effect animate-fade-in">
      <ScrollArea className="h-full">
        <div className="max-w-2xl mx-auto p-6">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <Avatar className="w-32 h-32 border-4 border-white/30">
                <AvatarFallback className="gradient-purple-magenta text-white text-4xl font-bold">
                  В
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 gradient-purple-blue rounded-full border-2 border-white/50 hover:opacity-90 transition-all">
                <Icon name="Camera" className="text-white" size={20} />
              </button>
            </div>
            <h1 className="text-3xl font-montserrat font-bold text-white mb-2">{userData.name}</h1>
            <p className="text-white/80">{userData.username}</p>
            <p className="text-white/70 text-sm mt-1">{userData.phone}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Icon name="Sparkles" size={20} />
                О себе
              </h2>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <Icon name="Edit2" className="text-white" size={18} />
              </button>
            </div>
            <p className="text-white/90">{userData.bio}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Icon name="Clock" size={20} />
                Статусы (исчезают через 24ч)
              </h2>
              <button className="p-2 gradient-purple-magenta rounded-lg hover:opacity-90 transition-all">
                <Icon name="Plus" className="text-white" size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              {mockStatuses.map((status) => (
                <div
                  key={status.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{status.emoji}</span>
                    <div>
                      <p className="text-white font-medium">{status.text}</p>
                      <p className="text-white/60 text-xs">{status.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {status.expiresIn}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all border border-white/20">
              <Icon name="Settings" className="text-white" size={20} />
              <span className="text-white font-medium">Настройки</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all border border-white/20">
              <Icon name="Bell" className="text-white" size={20} />
              <span className="text-white font-medium">Уведомления</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all border border-white/20">
              <Icon name="Users" className="text-white" size={20} />
              <span className="text-white font-medium">Контакты</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all border border-white/20">
              <Icon name="Phone" className="text-white" size={20} />
              <span className="text-white font-medium">Звонки</span>
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Profile;
