
import { cacheService } from '../../cacheService';
import { GeminiConfig, GeminiError } from '../types';

/**
 * Generate a cache key for Gemini requests
 */
export const generateGeminiCacheKey = (
  prefix: string,
  messageContent: string,
  systemInstructions?: string,
  config?: GeminiConfig
) => {
  const cacheData = {
    message: messageContent,
    ...(systemInstructions && { systemInstructions }),
    ...(config?.temperature && { temperature: config.temperature }),
    ...(config?.topP && { topP: config.topP }),
    ...(config?.topK && { topK: config.topK }),
    ...(config?.maxOutputTokens && { maxOutputTokens: config.maxOutputTokens })
  };
  
  return cacheService.generateCacheKey(prefix, cacheData);
};

/**
 * Check cache for existing response
 */
export const getFromCache = <T>(cacheKey: string, skipCache?: boolean): T | null => {
  if (skipCache) {
    return null;
  }
  
  const cachedResult = cacheService.get<T>(cacheKey);
  if (cachedResult) {
    console.log('Using cached Gemini response');
    return cachedResult;
  }
  
  return null;
};

/**
 * Save response to cache
 */
export const saveToCache = <T>(cacheKey: string, result: T): void => {
  if (typeof result === 'string' || !(result as any)?.isError) {
    cacheService.set(cacheKey, result, 5 * 60 * 1000);
  }
};
