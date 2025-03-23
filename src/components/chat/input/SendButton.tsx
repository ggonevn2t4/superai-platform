
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SendButtonProps {
  disabled: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all",
        disabled
          ? "bg-muted text-muted-foreground" 
          : "bg-primary text-white hover:bg-primary/90",
        "disabled:bg-muted disabled:text-muted-foreground"
      )}
      title="Gửi tin nhắn"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default SendButton;
