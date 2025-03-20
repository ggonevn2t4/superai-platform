
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ThemeToggleProps {
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = true }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center space-x-2">
      {showLabel && <Label htmlFor="theme-toggle" className="text-sm cursor-pointer">Giao diện</Label>}
      <div className="flex items-center gap-1.5">
        <Sun size={16} className={`transition-opacity ${isDark ? 'opacity-50' : 'opacity-100'}`} />
        <Switch
          id="theme-toggle"
          checked={isDark}
          onCheckedChange={toggleTheme}
          aria-label="Toggle theme"
        />
        <Moon size={16} className={`transition-opacity ${isDark ? 'opacity-100' : 'opacity-50'}`} />
      </div>
    </div>
  );
};

export default ThemeToggle;
