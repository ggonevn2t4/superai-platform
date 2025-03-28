
/**
 * Configuration settings for the DeepSeek service
 */

// API key for DeepSeek
export const DEEPSEEK_API_KEY = 'sk-b75ef026a6a24e6988912d6bf23f323c';

// API endpoint
export const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Default model
export const DEFAULT_MODEL = 'deepseek-chat';

// DeepSeek model versions
export const DEEPSEEK_MODELS = {
  DEFAULT: 'deepseek-chat',
  V3: 'deepseek-v3.0-0324',
};

// Default request parameters
export const DEFAULT_TEMPERATURE = 0.7;
export const DEFAULT_MAX_TOKENS = 2048;
