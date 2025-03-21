import { useState } from 'react';

export function useChatSettings() {
  const [model, setModel] = useState('deepseek-r1');
  const [temperature] = useState(0.7);
  const [maxTokens] = useState(2048);
  const [filterResult] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  
  return {
    model,
    setModel,
    temperature,
    maxTokens,
    filterResult,
    showAdvancedOptions,
    setShowAdvancedOptions,
    apiKeyError,
    setApiKeyError
  };
}
