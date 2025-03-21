
import React from 'react';
import { Loader2 } from 'lucide-react';

const ChatLoading: React.FC = () => {
  return (
    <div className="py-20 flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
      <span className="ml-2 text-muted-foreground">Đang tải cuộc trò chuyện...</span>
    </div>
  );
};

export default ChatLoading;
