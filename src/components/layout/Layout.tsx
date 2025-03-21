
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      {!isHomePage && <Sidebar />}
      <main className={`flex-1 transition-all duration-300 animate-fade-in ${isHomePage ? '' : isMobile ? 'pt-16 pb-6' : 'pt-20 pb-10'}`}>
        {children}
      </main>
      
      {!isHomePage && (
        <footer className="text-center py-4 text-sm text-muted-foreground border-t">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} SuperAI. Nền tảng AI toàn diện.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
