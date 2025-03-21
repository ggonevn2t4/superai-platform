
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, SearchCode, Sparkles, Layers, BookOpen, BrainCircuit, MessageSquare, LogOut, User, Menu, X, Info, FileText, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if user is admin
  useEffect(() => {
    if (user) {
      const checkAdminStatus = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          if (data && data.role === 'admin') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      };
      
      checkAdminStatus();
    }
  }, [user]);
  
  const navItems = [
    { icon: <MessageSquare size={isMobile ? 18 : 20} />, label: 'Chat', path: '/chat' },
    { icon: <BrainCircuit size={isMobile ? 18 : 20} />, label: 'Tools', path: '/tools' },
    { icon: <SearchCode size={isMobile ? 18 : 20} />, label: 'Trình duyệt', path: '/browser' },
    { icon: <Sparkles size={isMobile ? 18 : 20} />, label: 'Sáng tạo', path: '/creative' },
    { icon: <Layers size={isMobile ? 18 : 20} />, label: 'Wisebase', path: '/wisebase' },
    { icon: <Info size={isMobile ? 18 : 20} />, label: 'Giới thiệu', path: '/about' },
    { icon: <FileText size={isMobile ? 18 : 20} />, label: 'Blog', path: '/blog' },
    { icon: <BookOpen size={isMobile ? 18 : 20} />, label: 'Trợ giúp', path: '/help' },
    ...(isAdmin ? [{ icon: <Shield size={isMobile ? 18 : 20} />, label: 'Admin', path: '/admin' }] : []),
  ];
  
  const renderNavItems = () => (
    <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
            location.pathname === item.path
              ? 'bg-sidebar-accent text-sidebar-primary font-medium'
              : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          {item.icon}
          <span className={isMobile ? 'text-sm' : ''}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
  
  if (isMobile) {
    return (
      <div className="w-full bg-sidebar border-b border-sidebar-border fixed top-0 left-0 z-10 shadow-sm">
        <div className="container mx-auto px-2">
          <div className="flex items-center h-14">
            <Link to="/" className="flex items-center gap-1 mr-3">
              <Bot size={22} className="text-primary" />
              <span className="font-semibold text-lg">SuperAI</span>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[75vw] sm:max-w-sm pt-10">
                <div className="flex flex-col space-y-6">
                  <div className="px-1">
                    {navItems.map((item, index) => (
                      <SheetClose asChild key={index}>
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200 ${
                            location.pathname === item.path
                              ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  
                  {user && (
                    <div className="border-t pt-4 px-1">
                      <div className="px-4 py-2 text-sm font-medium">
                        <User className="inline-block mr-2 h-4 w-4" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start px-4 py-2 mt-2 text-sm"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-sidebar border-b border-sidebar-border fixed top-0 left-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <Bot size={24} className="text-primary" />
            <span className="font-semibold text-xl">SuperAI</span>
          </Link>
          
          {renderNavItems()}
          
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
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Trang quản trị</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
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
