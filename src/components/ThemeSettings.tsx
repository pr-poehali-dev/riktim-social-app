import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Theme {
  id: string;
  name: string;
  gradient: string;
  preview: string;
}

interface Wallpaper {
  id: string;
  name: string;
  preview: string;
  pattern: string;
}

const themes: Theme[] = [
  {
    id: 'gradient',
    name: 'Градиент',
    gradient: 'bg-gradient-to-br from-gradient-purple via-gradient-magenta to-gradient-blue',
    preview: 'linear-gradient(135deg, #8B5CF6, #D946EF, #0EA5E9)'
  },
  {
    id: 'dark',
    name: 'Тёмная',
    gradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    preview: 'linear-gradient(135deg, #111827, #1F2937, #000000)'
  },
  {
    id: 'ocean',
    name: 'Океан',
    gradient: 'bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400',
    preview: 'linear-gradient(135deg, #2563EB, #06B6D4, #2DD4BF)'
  },
  {
    id: 'sunset',
    name: 'Закат',
    gradient: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
    preview: 'linear-gradient(135deg, #F97316, #EC4899, #9333EA)'
  },
  {
    id: 'forest',
    name: 'Лес',
    gradient: 'bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500',
    preview: 'linear-gradient(135deg, #059669, #10B981, #14B8A6)'
  }
];

const wallpapers: Wallpaper[] = [
  {
    id: 'default',
    name: 'По умолчанию',
    preview: 'transparent',
    pattern: ''
  },
  {
    id: 'dots',
    name: 'Точки',
    preview: '#ffffff',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
  },
  {
    id: 'lines',
    name: 'Линии',
    preview: '#ffffff',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
  },
  {
    id: 'grid',
    name: 'Сетка',
    preview: '#ffffff',
    pattern: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)'
  },
  {
    id: 'waves',
    name: 'Волны',
    preview: '#ffffff',
    pattern: 'repeating-radial-gradient(circle at 0 0, transparent 0, rgba(255,255,255,0.05) 10px, transparent 20px)'
  }
];

interface ThemeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  currentWallpaper: string;
  onThemeChange: (themeId: string) => void;
  onWallpaperChange: (wallpaperId: string) => void;
}

const ThemeSettings = ({
  isOpen,
  onClose,
  currentTheme,
  currentWallpaper,
  onThemeChange,
  onWallpaperChange
}: ThemeSettingsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-white/20 text-white max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat flex items-center gap-2">
            <Icon name="Palette" size={24} />
            Темы и обои
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Темы приложения</h3>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      currentTheme === theme.id
                        ? 'border-white/60 bg-white/10'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{ background: theme.preview }}
                    />
                    <p className="font-medium">{theme.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Обои чата</h3>
              <div className="grid grid-cols-3 gap-3">
                {wallpapers.map((wallpaper) => (
                  <button
                    key={wallpaper.id}
                    onClick={() => onWallpaperChange(wallpaper.id)}
                    className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      currentWallpaper === wallpaper.id
                        ? 'border-white/60 bg-white/10'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    <div
                      className="w-full h-16 rounded-lg mb-2 bg-gradient-to-br from-white/10 to-white/5"
                      style={{
                        backgroundImage: wallpaper.pattern,
                        backgroundSize: wallpaper.id === 'grid' ? '20px 20px' : 'auto'
                      }}
                    />
                    <p className="text-sm font-medium">{wallpaper.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeSettings;
