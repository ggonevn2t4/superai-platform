
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from localStorage first (for quick initial render)
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
    setIsLoading(false);
  }, []);

  // If user is logged in, load theme preference from Supabase
  useEffect(() => {
    if (!user) return;

    const loadUserPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('theme')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error loading user preferences:', error);
          return;
        }

        if (data?.theme) {
          setTheme(data.theme as Theme);
          localStorage.setItem('theme', data.theme);
          document.documentElement.classList.toggle('dark', data.theme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load user preferences:', error);
      }
    };

    loadUserPreferences();
  }, [user]);

  // Save theme preference
  const saveThemePreference = async (newTheme: Theme) => {
    if (!user) {
      // Just save to localStorage if user is not logged in
      localStorage.setItem('theme', newTheme);
      return;
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert(
          { 
            user_id: user.id, 
            theme: newTheme, 
            updated_at: new Date().toISOString() 
          },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error saving theme preference:', error);
        toast.error('Không thể lưu thiết lập giao diện');
      } else {
        localStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      toast.error('Không thể lưu thiết lập giao diện');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    saveThemePreference(newTheme);
    
    // Notify user
    toast.success(`Đã chuyển sang giao diện ${newTheme === 'light' ? 'sáng' : 'tối'}`);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: (newTheme) => {
          setTheme(newTheme);
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          saveThemePreference(newTheme);
        },
      }}
    >
      {!isLoading && children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
