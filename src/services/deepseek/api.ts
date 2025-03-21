
/**
 * Core API functionality for interacting with the DeepSeek service
 */

import { 
  DEFAULT_MODEL,
  DEFAULT_TEMPERATURE,
  DEFAULT_MAX_TOKENS
} from './config';
import { 
  DeepSeekRequest, 
  DeepSeekError, 
  DeepSeekConfig 
} from './types';
import { makeDeepSeekRequest } from './utils/requestHandler';
import { processDeepSeekResponse } from './utils/responseProcessor';
import { createErrorResponse } from './utils/errorUtils';
import { 
  generateDeepSeekCacheKey,
  getFromCache,
  saveToCache
} from './utils/cacheUtils';

/**
 * Gửi tin nhắn đến API DeepSeek và nhận phản hồi
 */
export const sendMessageToDeepSeek = async (
  messageContent: string, 
  config: DeepSeekConfig = {}
): Promise<string | DeepSeekError> => {
  try {
    // Generate cache key based on message and configuration
    const cacheKey = generateDeepSeekCacheKey(
      'deepseek',
      messageContent,
      undefined,
      config
    );
    
    // Check cache first if not explicitly skipped
    const cachedResult = getFromCache<string | DeepSeekError>(cacheKey, config.skipCache);
    if (cachedResult) {
      return cachedResult;
    }
    
    const requestBody: DeepSeekRequest = {
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'user',
          content: messageContent
        }
      ],
      temperature: config.temperature ?? DEFAULT_TEMPERATURE,
      max_tokens: config.maxTokens ?? DEFAULT_MAX_TOKENS
    };
    
    const apiResponse = await makeDeepSeekRequest(requestBody);
    const result = processDeepSeekResponse(apiResponse);
    
    // Cache successful string responses
    saveToCache(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Lỗi khi gọi DeepSeek API:', error);
    return createErrorResponse(
      500,
      error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    );
  }
};

/**
 * Function to help provide system instructions to DeepSeek
 */
export const sendMessageWithSystemInstructions = async (
  messageContent: string,
  systemInstructions: string,
  config: DeepSeekConfig = {}
): Promise<string | DeepSeekError> => {
  try {
    // Generate cache key based on message, system instructions, and configuration
    const cacheKey = generateDeepSeekCacheKey(
      'deepseek-system',
      messageContent,
      systemInstructions,
      config
    );
    
    // Check cache first if not explicitly skipped
    const cachedResult = getFromCache<string | DeepSeekError>(cacheKey, config.skipCache);
    if (cachedResult) {
      return cachedResult;
    }
    
    const requestBody: DeepSeekRequest = {
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: systemInstructions
        },
        {
          role: 'user',
          content: messageContent
        }
      ],
      temperature: config.temperature ?? DEFAULT_TEMPERATURE,
      max_tokens: config.maxTokens ?? DEFAULT_MAX_TOKENS
    };
    
    const apiResponse = await makeDeepSeekRequest(requestBody);
    const result = processDeepSeekResponse(apiResponse);
    
    // Cache successful string responses
    saveToCache(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Lỗi khi gọi DeepSeek API:', error);
    return createErrorResponse(
      500,
      error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    );
  }
};
