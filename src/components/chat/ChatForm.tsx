
import React, { useState } from 'react';
import ChatInput from './ChatInput';
import AdvancedModelOptions from './AdvancedModelOptions';

interface ChatFormProps {
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  model: string;
  isReadOnly?: boolean;
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
  isReadOnly = false,
  showAdvancedOptions,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  filterResult,
  setFilterResult,
}) => {
  const [input, setInput] = useState('');
  const [toggleAdvancedOptions, setToggleAdvancedOptions] = useState(showAdvancedOptions);

  const toggleOptions = () => {
    setToggleAdvancedOptions(!toggleAdvancedOptions);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
      setInput('');
    }
  };

  const charCount = input.length;

  return (
    <div className="p-4 border-t">
      {toggleAdvancedOptions && (
        <AdvancedModelOptions
          temperature={temperature}
          setTemperature={setTemperature}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          filterResult={filterResult}
          setFilterResult={setFilterResult}
          model={model}
        />
      )}
      <ChatInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleFormSubmit}
        apiKeyError={apiKeyError}
        charCount={charCount}
        model={model}
        isReadOnly={isReadOnly}
        showAdvancedOptions={toggleAdvancedOptions}
        toggleAdvancedOptions={toggleOptions}
      />
    </div>
  );
};

export default ChatForm;
