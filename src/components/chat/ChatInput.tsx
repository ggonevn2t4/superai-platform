
import React from 'react';
import { ChatInputContainer } from './input';

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
  return (
    <ChatInputContainer
      input={input}
      setInput={setInput}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      apiKeyError={apiKeyError}
      charCount={charCount}
      model={model}
      isReadOnly={isReadOnly}
      showAdvancedOptions={false}
      toggleAdvancedOptions={() => {}}
    />
  );
};

export default ChatInput;
