
import { cacheService } from '../../cacheService';
import { DeepSeekConfig, DeepSeekError } from '../types';

/**
 * Generate a cache key for DeepSeek requests
 */
export const generateDeepSeekCacheKey = (
  prefix: string,
  messageContent: string,
  systemInstructions?: string,
  config?: DeepSeekConfig
) => {
  const cacheData = {
    message: messageContent,
    ...(systemInstructions && { systemInstructions }),
    ...(config?.temperature && { temperature: config.temperature }),
    ...(config?.maxTokens && { maxTokens: config.maxTokens })
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
    console.log('Using cached DeepSeek response');
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
