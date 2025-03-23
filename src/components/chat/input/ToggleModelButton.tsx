
import React from 'react';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from 'lucide-react';
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
            className="rounded-full h-10 w-10 text-primary hover:text-primary hover:bg-primary/10"
            onClick={onClick}
          >
            <SparklesIcon size={20} />
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
