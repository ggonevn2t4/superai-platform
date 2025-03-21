
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, SearchCode, Sparkles, Layers, 
  BookOpen, BrainCircuit, Info, FileText, Shield, Tag
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAdminCheck } from '@/hooks/useAdminCheck';

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  icon, label, path, isActive, onClick 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Link
      to={path}
      className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
        isActive
          ? 'bg-primary/10 text-primary font-medium shadow-sm'
          : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
      }`}
      onClick={onClick}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        size: isMobile ? 18 : 20, 
        className: "transition-all duration-300" 
      })}
      <span className={isMobile ? 'text-sm' : ''}>{label}</span>
    </Link>
  );
};

export const useNavItems = () => {
  const location = useLocation();
  const isAdmin = useAdminCheck();
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: <MessageSquare />, label: 'Chat', path: '/chat' },
    { icon: <BrainCircuit />, label: 'Công cụ', path: '/tools' },
    { icon: <SearchCode />, label: 'Trình duyệt', path: '/browser' },
    { icon: <Sparkles />, label: 'Sáng tạo', path: '/creative' },
    { icon: <Layers />, label: 'Wisebase', path: '/wisebase' },
    { icon: <Tag />, label: 'Bảng giá', path: '/pricing' },
    { icon: <FileText />, label: 'Blog', path: '/blog' },
    { icon: <Info />, label: 'Giới thiệu', path: '/about' },
    { icon: <BookOpen />, label: 'Trợ giúp', path: '/help' },
    ...(isAdmin ? [{ icon: <Shield />, label: 'Admin', path: '/admin' }] : []),
  ];
  
  return { navItems, location, isMobile };
};

export const Navigation: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { navItems, location, isMobile } = useNavItems();
  
  return (
    <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
      {navItems.map((item, index) => (
        <NavigationItem
          key={index}
          icon={item.icon}
          label={item.label}
          path={item.path}
          isActive={location.pathname === item.path}
          onClick={onClick}
        />
      ))}
    </nav>
  );
};
