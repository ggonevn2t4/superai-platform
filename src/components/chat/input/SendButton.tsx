
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
        "absolute right-10 top-2 p-1.5 rounded-full transition-all",
        disabled
          ? "bg-muted text-muted-foreground" 
          : "bg-primary text-white hover:bg-primary/90",
        "disabled:bg-muted disabled:text-muted-foreground"
      )}
      title="Gửi tin nhắn"
    >
      <ArrowUp size={16} />
    </button>
  );
};

export default SendButton;
