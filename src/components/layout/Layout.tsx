
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex min-h-screen">
      {!isHomePage && <Sidebar />}
      <main className={`flex-1 transition-all duration-300 animate-fade-in ${isHomePage ? 'w-full' : 'w-[calc(100%-280px)]'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
