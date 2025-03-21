
import React from 'react';
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
  return (
    <>
      <ChatInput 
        input=""
        setInput={() => {}}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        apiKeyError={apiKeyError}
        isRecording={false}
        toggleRecording={() => {}}
        charCount={0}
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
