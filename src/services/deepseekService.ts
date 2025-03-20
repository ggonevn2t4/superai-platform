
// API key cho DeepSeek
export const DEEPSEEK_API_KEY = 'sk-b75ef026a6a24e6988912d6bf23f323c';

import { cacheService } from './cacheService';

// Interface cho request và response
export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface DeepSeekConfig {
  temperature?: number;
  maxTokens?: number;
  skipCache?: boolean; // New option to skip cache
}

export interface DeepSeekError {
  isError: true;
  code: number;
  message: string;
  status?: string;
}

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
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 2048
    });
    
    // Check cache first if not explicitly skipped
    if (!config.skipCache) {
      const cachedResult = cacheService.get<string | DeepSeekError>(cacheKey);
      if (cachedResult) {
        console.log('Using cached DeepSeek response');
        return cachedResult;
      }
    }
    
    const apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    
    const requestBody: DeepSeekRequest = {
      model: "deepseek-chat",
      messages: [
        {
          role: 'user',
          content: messageContent
        }
      ],
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 2048
    };
    
    const response = await fetch(apiUrl, {
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
      
      // Xử lý lỗi quota vượt quá
      if (errorCode === 429) {
        const errorResponse = {
          isError: true,
          code: errorCode,
          message: 'Quota API của DeepSeek đã hết. Vui lòng thử lại sau hoặc sử dụng một API key khác.',
          status: errorData?.error?.type
        } as DeepSeekError;
        return errorResponse;
      }
      
      const errorResponse = {
        isError: true,
        code: errorCode,
        message: errorMsg,
        status: errorData?.error?.type
      } as DeepSeekError;
      return errorResponse;
    }
    
    const data: DeepSeekResponse = await response.json();
    
    if (data.choices && data.choices.length > 0 && data.choices[0].message.content) {
      const result = data.choices[0].message.content;
      
      // Cache successful response for 5 minutes
      cacheService.set(cacheKey, result, 5 * 60 * 1000);
      
      return result;
    } else {
      const errorResponse = {
        isError: true,
        code: 0,
        message: 'Không nhận được phản hồi hợp lệ từ DeepSeek API'
      } as DeepSeekError;
      return errorResponse;
    }
  } catch (error) {
    console.error('Lỗi khi gọi DeepSeek API:', error);
    const errorResponse = {
      isError: true,
      code: 500,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    } as DeepSeekError;
    return errorResponse;
  }
};

// Function to help provide system instructions to DeepSeek
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
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 2048
    });
    
    // Check cache first if not explicitly skipped
    if (!config.skipCache) {
      const cachedResult = cacheService.get<string | DeepSeekError>(cacheKey);
      if (cachedResult) {
        console.log('Using cached DeepSeek system response');
        return cachedResult;
      }
    }
    
    const apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    
    const requestBody: DeepSeekRequest = {
      model: "deepseek-chat",
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
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 2048
    };
    
    const response = await fetch(apiUrl, {
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
      
      if (errorCode === 429) {
        const errorResponse = {
          isError: true,
          code: errorCode,
          message: 'Quota API của DeepSeek đã hết. Vui lòng thử lại sau hoặc sử dụng một API key khác.',
          status: errorData?.error?.type
        } as DeepSeekError;
        return errorResponse;
      }
      
      const errorResponse = {
        isError: true,
        code: errorCode,
        message: errorMsg,
        status: errorData?.error?.type
      } as DeepSeekError;
      return errorResponse;
    }
    
    const data: DeepSeekResponse = await response.json();
    
    if (data.choices && data.choices.length > 0 && data.choices[0].message.content) {
      const result = data.choices[0].message.content;
      
      // Cache successful response for 5 minutes
      cacheService.set(cacheKey, result, 5 * 60 * 1000);
      
      return result;
    } else {
      const errorResponse = {
        isError: true,
        code: 0,
        message: 'Không nhận được phản hồi hợp lệ từ DeepSeek API'
      } as DeepSeekError;
      return errorResponse;
    }
  } catch (error) {
    console.error('Lỗi khi gọi DeepSeek API:', error);
    const errorResponse = {
      isError: true,
      code: 500,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    } as DeepSeekError;
    return errorResponse;
  }
};
