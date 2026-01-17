import { useState, useEffect } from 'react';
import NotificationToast from './NotificationToast';

interface Notification {
  id: string;
  contactName: string;
  message: string;
  chatId: number;
}

interface NotificationContainerProps {
  onNotificationClick: (chatId: number) => void;
}

const NotificationContainer = ({ onNotificationClick }: NotificationContainerProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const demoTimer = setTimeout(() => {
      addNotification({
        id: Date.now().toString(),
        contactName: 'Дмитрий Иванов',
        message: 'Привет! Ты уже посмотрел документы?',
        chatId: 2
      });
    }, 5000);

    const demoTimer2 = setTimeout(() => {
      addNotification({
        id: (Date.now() + 1).toString(),
        contactName: 'Мария Петрова',
        message: 'Спасибо за вчерашнюю встречу! 🙌',
        chatId: 3
      });
    }, 10000);

    return () => {
      clearTimeout(demoTimer);
      clearTimeout(demoTimer2);
    };
  }, []);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.contactName, {
        body: notification.message,
        icon: '/favicon.svg',
        badge: '/favicon.svg'
      });
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (chatId: number, id: string) => {
    removeNotification(id);
    onNotificationClick(chatId);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationToast
            {...notification}
            onClose={removeNotification}
            onClick={() => handleNotificationClick(notification.chatId, notification.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
