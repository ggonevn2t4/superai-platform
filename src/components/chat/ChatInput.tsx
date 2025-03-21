
import React, { useState } from 'react';
import { ChatInputContainer } from './input';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  isRecording: boolean;
  toggleRecording: () => void;
  charCount: number;
  model: string;
  isReadOnly?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit,
  apiKeyError,
  isRecording: _isRecording, // Not used anymore
  toggleRecording: _toggleRecording, // Not used anymore
  charCount,
  model,
  isReadOnly = false
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
    />
  );
};

export default ChatInput;
