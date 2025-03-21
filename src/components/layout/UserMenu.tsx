
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  isAdmin: boolean;
  pathname: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ isAdmin, pathname }) => {
  const { user, signOut } = useAuth();
  
  if (!user) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 gap-2 hover:bg-primary/5">
          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-white", 
            pathname === '/chat' ? "bg-primary" : "bg-primary/90")}>
            <span className="text-sm font-medium">{user.email?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
          <span className="hidden md:inline-block text-sm">{user.email?.split('@')[0]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
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
  );
};
