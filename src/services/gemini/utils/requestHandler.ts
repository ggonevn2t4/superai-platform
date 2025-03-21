
import { 
  GEMINI_API_KEY, 
  GEMINI_API_URL 
} from '../config';
import { GeminiRequest, GeminiResponse, GeminiError } from '../types';
import { createErrorResponse, ensureErrorCodeIsNumber } from './errorUtils';

/**
 * Makes a request to the Gemini API
 */
export const makeGeminiRequest = async (
  requestBody: GeminiRequest
): Promise<GeminiResponse | GeminiError> => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorCode = ensureErrorCodeIsNumber(errorData?.error?.code || response.status);
      const errorMsg = errorData?.error?.message || 'Lỗi không xác định';
      const errorStatus = errorData?.error?.status;
      
      // Xử lý lỗi quota vượt quá
      if (errorCode === 429) {
        return createErrorResponse(
          errorCode,
          'Quota API của Gemini đã hết. Vui lòng thử lại sau hoặc sử dụng một API key khác.',
          errorStatus
        );
      }
      
      return createErrorResponse(
        errorCode,
        errorMsg,
        errorStatus
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error);
    return createErrorResponse(
      500,
      error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    );
  }
};
