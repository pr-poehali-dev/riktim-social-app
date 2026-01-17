import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type AuthStep = 'phone' | 'code' | 'profile';

interface AuthProps {
  onAuthComplete: (userData: { phone: string; name: string }) => void;
}

const Auth = ({ onAuthComplete }: AuthProps) => {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 1500);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (code === '1234') {
        setStep('profile');
      } else {
        alert('Неверный код! Попробуйте 1234');
      }
    }, 1000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthComplete({ phone, name });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-purple via-gradient-magenta to-gradient-blue p-4">
      <div className="w-full max-w-md glass-effect rounded-3xl p-8 border border-white/20 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-montserrat font-bold text-white mb-2">Riktim</h1>
          <p className="text-white/80">Современный мессенджер</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Номер телефона</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icon name="Phone" className="text-white/60" size={20} />
                </div>
                <Input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-white/30"
                  required
                />
              </div>
              <p className="text-white/60 text-sm mt-2">
                Мы отправим вам код подтверждения
              </p>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading || !phone}
              className="w-full gradient-purple-magenta text-white font-semibold py-6 rounded-xl hover:opacity-90 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Отправка...
                </span>
              ) : (
                'Получить код'
              )}
            </Button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-all mb-4"
            >
              <Icon name="ArrowLeft" size={20} />
              Изменить номер
            </button>

            <div>
              <label className="block text-white font-medium mb-2">Код подтверждения</label>
              <p className="text-white/70 text-sm mb-3">
                Отправлен на {phone}
              </p>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icon name="Lock" className="text-white/60" size={20} />
                </div>
                <Input
                  type="text"
                  placeholder="1234"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={4}
                  className="pl-10 bg-white/10 border-white/20 text-white text-center text-2xl tracking-widest placeholder-white/60 focus:ring-white/30"
                  required
                />
              </div>
              <p className="text-white/60 text-sm mt-2 text-center">
                Для демо используйте код: 1234
              </p>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading || code.length < 4}
              className="w-full gradient-purple-magenta text-white font-semibold py-6 rounded-xl hover:opacity-90 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Проверка...
                </span>
              ) : (
                'Подтвердить'
              )}
            </Button>

            <button
              type="button"
              className="w-full text-white/80 hover:text-white transition-all text-sm"
            >
              Отправить код повторно
            </button>
          </form>
        )}

        {step === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto gradient-purple-blue rounded-full flex items-center justify-center mb-3">
                <Icon name="User" className="text-white" size={48} />
              </div>
              <p className="text-white/80">Последний шаг!</p>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Ваше имя</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icon name="User" className="text-white/60" size={20} />
                </div>
                <Input
                  type="text"
                  placeholder="Как вас зовут?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-white/30"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={!name}
              className="w-full gradient-purple-magenta text-white font-semibold py-6 rounded-xl hover:opacity-90 transition-all"
            >
              Начать общение 🚀
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
