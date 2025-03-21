
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Navigation } from './Navigation';
import { MobileSidebar } from './MobileSidebar';
import { UserMenu } from './UserMenu';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isAdmin = useAdminCheck();
  
  if (isMobile) {
    return <MobileSidebar />;
  }

  return (
    <div className="w-full bg-white border-b border-sidebar-border fixed top-0 left-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 mr-8 group">
            <div className="bg-primary p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110">
              <Bot size={20} className="text-white" />
            </div>
            <span className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              SuperAI
            </span>
          </Link>
          
          <Navigation />
          
          <div className="ml-auto hidden md:flex items-center">
            {user && (
              <UserMenu isAdmin={isAdmin} pathname={location.pathname} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
