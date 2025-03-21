
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatLoading: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-10 md:py-20 flex flex-col items-center justify-center">
      <Loader2 className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-primary animate-spin`} />
      <span className="mt-3 text-center text-muted-foreground">
        Đang tải cuộc trò chuyện...
      </span>
    </div>
  );
};

export default ChatLoading;
