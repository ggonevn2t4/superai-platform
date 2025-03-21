
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ToggleModelButtonProps {
  onClick: () => void;
  showAdvancedOptions: boolean;
  disabled?: boolean;
}

const ToggleModelButton: React.FC<ToggleModelButtonProps> = ({
  onClick,
  showAdvancedOptions,
  disabled = false
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "absolute right-2 top-2 hover:bg-accent/60 transition-all mobile-touch-target",
        showAdvancedOptions && "text-primary bg-accent/80",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
      title="Cài đặt mô hình"
      aria-label="Cài đặt mô hình"
    >
      <Settings size={16} />
    </Button>
  );
};

export default ToggleModelButton;
