
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Navigation, useNavItems } from './Navigation';

export const MobileSidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { navItems } = useNavItems();
  
  return (
    <div className="w-full bg-white border-b border-sidebar-border fixed top-0 left-0 z-10 shadow-sm">
      <div className="container mx-auto px-3">
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
                            ? 'bg-primary/10 text-primary font-medium shadow-sm'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`}
                      >
                        {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
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
};
