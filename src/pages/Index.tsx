import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import Profile from '@/components/Profile';
import Icon from '@/components/ui/icon';

type View = 'chats' | 'profile';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('chats');
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gradient-purple via-gradient-magenta to-gradient-blue">
      <header className="glass-effect border-b border-white/20 px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-montserrat font-bold text-white">Riktim</h1>
        <div className="flex gap-2">
          <button
            onClick={() => { setCurrentView('chats'); setSelectedChatId(null); }}
            className={`p-2 rounded-lg transition-all ${currentView === 'chats' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <Icon name="MessageCircle" className="text-white" size={24} />
          </button>
          <button
            onClick={() => { setCurrentView('profile'); setSelectedChatId(null); }}
            className={`p-2 rounded-lg transition-all ${currentView === 'profile' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <Icon name="User" className="text-white" size={24} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {currentView === 'chats' && (
          <>
            <ChatList 
              onSelectChat={setSelectedChatId} 
              selectedChatId={selectedChatId}
            />
            {selectedChatId && (
              <ChatWindow 
                chatId={selectedChatId} 
                onClose={() => setSelectedChatId(null)}
              />
            )}
          </>
        )}
        
        {currentView === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default Index;
