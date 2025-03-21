
import { useState } from 'react';

export function useChatSettings() {
  const [model, setModel] = useState('deepseek-r1');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [filterResult, setFilterResult] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  
  return {
    model,
    setModel,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    filterResult,
    setFilterResult,
    showAdvancedOptions,
    setShowAdvancedOptions,
    apiKeyError,
    setApiKeyError
  };
}
