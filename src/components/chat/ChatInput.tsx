
import React, { useRef, useEffect } from 'react';
import { ChatInputContainer } from './input';
import { LightbulbIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  charCount: number;
  model: string;
  isReadOnly?: boolean;
  showAdvancedOptions: boolean;
  toggleAdvancedOptions: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit,
  apiKeyError,
  charCount,
  model,
  isReadOnly = false,
  showAdvancedOptions,
  toggleAdvancedOptions
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  // Nhấn Submit khi nhấn Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && input.trim() && !isLoading) {
        e.preventDefault();
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, isLoading]);
  
  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="flex items-center text-xs text-muted-foreground"
          onClick={toggleAdvancedOptions}
        >
          <LightbulbIcon size={14} className="mr-1" />
          Gợi ý nhanh
        </Button>
      </div>
      
      <form ref={formRef} onSubmit={handleSubmit}>
        <ChatInputContainer
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          apiKeyError={apiKeyError}
          charCount={charCount}
          model={model}
          isReadOnly={isReadOnly}
          showAdvancedOptions={showAdvancedOptions}
          toggleAdvancedOptions={toggleAdvancedOptions}
        />
      </form>
    </div>
  );
};

export default ChatInput;
