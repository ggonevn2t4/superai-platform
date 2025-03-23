
import React from 'react';
import { Button } from '@/components/ui/button';
import { LightbulbIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ToggleModelButtonProps {
  onClick: () => void;
}

const ToggleModelButton: React.FC<ToggleModelButtonProps> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onClick}
          >
            <LightbulbIcon size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Gợi ý nhanh</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToggleModelButton;
