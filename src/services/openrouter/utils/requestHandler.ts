
import { 
  OPENROUTER_API_KEY, 
  OPENROUTER_API_URL,
  OPENROUTER_REFERER,
  OPENROUTER_TITLE
} from '../config';
import { OpenRouterRequest, OpenRouterResponse, OpenRouterError } from '../types';
import { createErrorResponse, ensureErrorCodeIsNumber } from './errorUtils';

/**
 * Makes a request to the OpenRouter API
 */
export const makeOpenRouterRequest = async (
  requestBody: OpenRouterRequest
): Promise<OpenRouterResponse | OpenRouterError> => {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': OPENROUTER_REFERER,
        'X-Title': OPENROUTER_TITLE
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorCode = ensureErrorCodeIsNumber(errorData?.error?.code || response.status);
      const errorMsg = errorData?.error?.message || 'Lỗi không xác định';
      
      // Xử lý lỗi quota vượt quá
      if (errorCode === 429) {
        return createErrorResponse(
          errorCode,
          'Quota API của OpenRouter đã hết. Vui lòng thử lại sau hoặc sử dụng một API key khác.'
        );
      }
      
      return createErrorResponse(
        errorCode,
        errorMsg
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi gọi OpenRouter API:', error);
    return createErrorResponse(
      500,
      error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    );
  }
};
