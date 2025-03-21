
import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatSettings from './ChatSettings';

interface ChatFormProps {
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  model: string;
  isReadOnly: boolean;
  showAdvancedOptions: boolean;
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  filterResult: boolean;
  setFilterResult: (value: boolean) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({
  isLoading,
  handleSubmit,
  apiKeyError,
  model,
  isReadOnly,
  showAdvancedOptions,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  filterResult,
  setFilterResult
}) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const charCount = input.length;

  const toggleRecording = () => {
    setIsRecording(prev => !prev);
  };

  return (
    <>
      <ChatInput 
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        apiKeyError={apiKeyError}
        isRecording={isRecording}
        toggleRecording={toggleRecording}
        charCount={charCount}
        model={model}
        isReadOnly={isReadOnly}
      />
      <ChatSettings 
        showAdvancedOptions={showAdvancedOptions}
        temperature={temperature}
        setTemperature={setTemperature}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        filterResult={filterResult}
        setFilterResult={setFilterResult}
      />
    </>
  );
};

export default ChatForm;
