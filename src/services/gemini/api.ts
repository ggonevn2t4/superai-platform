
import { 
  DEFAULT_TEMPERATURE,
  DEFAULT_TOP_P,
  DEFAULT_TOP_K,
  DEFAULT_MAX_OUTPUT_TOKENS
} from './config';
import { GeminiRequest, GeminiError, GeminiConfig } from './types';
import { makeGeminiRequest } from './utils/requestHandler';
import { processGeminiResponse } from './utils/responseProcessor';
import { 
  generateGeminiCacheKey,
  getFromCache,
  saveToCache
} from './utils/cacheUtils';

/**
 * Gửi tin nhắn đến API Gemini và nhận phản hồi
 */
export const sendMessageToGemini = async (
  messageContent: string, 
  config: GeminiConfig = {}
): Promise<string | GeminiError> => {
  try {
    // Generate cache key based on message and configuration
    const cacheKey = generateGeminiCacheKey(
      'gemini',
      messageContent,
      undefined,
      config
    );
    
    // Check cache first if not explicitly skipped
    const cachedResult = getFromCache<string | GeminiError>(cacheKey, config.skipCache);
    if (cachedResult) {
      return cachedResult;
    }
    
    const requestBody: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [{ text: messageContent }]
        }
      ],
      generationConfig: {
        temperature: config.temperature ?? DEFAULT_TEMPERATURE,
        topP: config.topP ?? DEFAULT_TOP_P,
        topK: config.topK ?? DEFAULT_TOP_K,
        maxOutputTokens: config.maxOutputTokens ?? DEFAULT_MAX_OUTPUT_TOKENS
      }
    };
    
    const apiResponse = await makeGeminiRequest(requestBody);
    const result = processGeminiResponse(apiResponse);
    
    // Cache successful responses
    saveToCache(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error);
    return {
      isError: true,
      code: 500,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    };
  }
};

/**
 * Function to help provide system instructions to Gemini
 */
export const sendMessageWithSystemInstructions = async (
  messageContent: string,
  systemInstructions: string,
  config: GeminiConfig = {}
): Promise<string | GeminiError> => {
  try {
    // Generate cache key based on message, system instructions, and configuration
    const cacheKey = generateGeminiCacheKey(
      'gemini-system',
      messageContent,
      systemInstructions,
      config
    );
    
    // Check cache first if not explicitly skipped
    const cachedResult = getFromCache<string | GeminiError>(cacheKey, config.skipCache);
    if (cachedResult) {
      return cachedResult;
    }
    
    const requestBody: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [{ text: systemInstructions }]
        },
        {
          role: 'model',
          parts: [{ text: 'Tôi sẽ tuân theo những hướng dẫn trên.' }]
        },
        {
          role: 'user',
          parts: [{ text: messageContent }]
        }
      ],
      generationConfig: {
        temperature: config.temperature ?? DEFAULT_TEMPERATURE,
        topP: config.topP ?? DEFAULT_TOP_P,
        topK: config.topK ?? DEFAULT_TOP_K,
        maxOutputTokens: config.maxOutputTokens ?? DEFAULT_MAX_OUTPUT_TOKENS
      }
    };
    
    const apiResponse = await makeGeminiRequest(requestBody);
    const result = processGeminiResponse(apiResponse);
    
    // Cache successful responses
    saveToCache(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error);
    return {
      isError: true,
      code: 500,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    };
  }
};
