
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
    <div className="flex flex-col min-h-screen">
      {!isHomePage && <Sidebar />}
      <main className={`flex-1 transition-all duration-300 animate-fade-in ${isHomePage ? '' : isMobile ? 'pt-14' : 'pt-16'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
