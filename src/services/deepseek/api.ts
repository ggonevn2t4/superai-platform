
/**
 * Core API functionality for interacting with the DeepSeek service
 */

import { 
  DEEPSEEK_API_KEY, 
  DEEPSEEK_API_URL, 
  DEFAULT_MODEL,
  DEFAULT_TEMPERATURE,
  DEFAULT_MAX_TOKENS
} from './config';
import { 
  DeepSeekMessage, 
  DeepSeekRequest, 
  DeepSeekResponse, 
  DeepSeekConfig, 
  DeepSeekError 
} from './types';
import { cacheService } from '../cacheService';

/**
 * Creates a standard error response object
 */
const createErrorResponse = (code: number, message: string, status?: string): DeepSeekError => {
  return {
    isError: true,
    code,
    message,
    status
  };
};

/**
 * Makes a request to the DeepSeek API
 */
const makeDeepSeekRequest = async (
  requestBody: DeepSeekRequest
): Promise<DeepSeekResponse | DeepSeekError> => {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorCode = response.status;
      const errorMsg = errorData?.error?.message || 'Lỗi không xác định';
      
      // Handle quota exceeded error
      if (errorCode === 429) {
        return createErrorResponse(
          errorCode,
          'Quota API của DeepSeek đã hết. Vui lòng thử lại sau hoặc sử dụng một API key khác.',
          errorData?.error?.type
        );
      }
      
      return createErrorResponse(
        errorCode,
        errorMsg,
        errorData?.error?.type
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi gọi DeepSeek API:', error);
    return createErrorResponse(
      500,
      error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    );
  }
};

/**
 * Process the DeepSeek API response
 */
const processDeepSeekResponse = (data: DeepSeekResponse | DeepSeekError): string | DeepSeekError => {
  // If it's already an error response, return it directly
  if ('isError' in data) {
    return data;
  }
  
  // Extract the message content from the response
  if (data.choices && data.choices.length > 0 && data.choices[0].message.content) {
    return data.choices[0].message.content;
  } else {
    return createErrorResponse(
      0,
      'Không nhận được phản hồi hợp lệ từ DeepSeek API'
    );
  }
};

/**
 * Gửi tin nhắn đến API DeepSeek và nhận phản hồi
 */
export const sendMessageToDeepSeek = async (
  messageContent: string, 
  config: DeepSeekConfig = {}
): Promise<string | DeepSeekError> => {
  try {
    // Generate cache key based on message and configuration
    const cacheKey = cacheService.generateCacheKey('deepseek', {
      message: messageContent,
      temperature: config.temperature ?? DEFAULT_TEMPERATURE,
      maxTokens: config.maxTokens ?? DEFAULT_MAX_TOKENS
    });
    
    // Check cache first if not explicitly skipped
    if (!config.skipCache) {
      const cachedResult = cacheService.get<string | DeepSeekError>(cacheKey);
      if (cachedResult) {
        console.log('Using cached DeepSeek response');
        return cachedResult;
      }
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
    if (typeof result === 'string') {
      cacheService.set(cacheKey, result, 5 * 60 * 1000);
    }
    
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
    const cacheKey = cacheService.generateCacheKey('deepseek-system', {
      message: messageContent,
      systemInstructions,
      temperature: config.temperature ?? DEFAULT_TEMPERATURE,
      maxTokens: config.maxTokens ?? DEFAULT_MAX_TOKENS
    });
    
    // Check cache first if not explicitly skipped
    if (!config.skipCache) {
      const cachedResult = cacheService.get<string | DeepSeekError>(cacheKey);
      if (cachedResult) {
        console.log('Using cached DeepSeek system response');
        return cachedResult;
      }
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
    if (typeof result === 'string') {
      cacheService.set(cacheKey, result, 5 * 60 * 1000);
    }
    
    return result;
  } catch (error) {
    console.error('Lỗi khi gọi DeepSeek API:', error);
    return createErrorResponse(
      500,
      error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    );
  }
};
