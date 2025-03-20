
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, SearchCode, Sparkles, Layers, BookOpen, BrainCircuit, MessageSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const navItems = [
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
    { icon: <BrainCircuit size={20} />, label: 'Tools', path: '/tools' },
    { icon: <SearchCode size={20} />, label: 'Trình duyệt', path: '/browser' },
    { icon: <Sparkles size={20} />, label: 'Sáng tạo', path: '/creative' },
    { icon: <Layers size={20} />, label: 'Wisebase', path: '/wisebase' },
    { icon: <BookOpen size={20} />, label: 'Trợ giúp', path: '/help' },
  ];
  
  return (
    <div className="w-full bg-sidebar border-b border-sidebar-border fixed top-0 left-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <Bot size={24} className="text-primary" />
            <span className="font-semibold text-xl">SuperAI</span>
          </Link>
          
          <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  location.pathname === item.path
                    ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="ml-auto hidden md:flex items-center">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                      <span className="text-sm font-medium">{user.email?.charAt(0).toUpperCase() || 'U'}</span>
                    </div>
                    <span className="hidden md:inline-block text-sm">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-sm">
                    <User className="mr-2 h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
