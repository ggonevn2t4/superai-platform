import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Keeping the component but it will not be used in the UI
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
  // This component is now hidden
  return null;
};

export default ToggleModelButton;
