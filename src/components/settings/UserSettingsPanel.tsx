
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { Separator } from '@/components/ui/separator';

const UserSettingsPanel = () => {
  const { user, signOut } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="User settings">
          <Settings size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Thiết lập người dùng</SheetTitle>
          <SheetDescription>
            Tùy chỉnh trải nghiệm của bạn
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {user && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Tài khoản</div>
              <div className="p-3 bg-muted/50 rounded-md text-sm overflow-hidden text-ellipsis">
                {user.email}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="text-sm font-medium">Giao diện</div>
            <div className="flex justify-between items-center">
              <ThemeToggle showLabel={true} />
            </div>
          </div>

          <Separator />

          <div className="pt-2">
            <Button 
              variant="destructive" 
              className="w-full flex items-center gap-2"
              onClick={signOut}
            >
              <LogOut size={16} />
              Đăng xuất
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSettingsPanel;
