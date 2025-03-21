
import { 
  DEEPSEEK_API_KEY, 
  DEEPSEEK_API_URL 
} from '../config';
import { DeepSeekRequest, DeepSeekResponse, DeepSeekError } from '../types';
import { createErrorResponse } from './errorUtils';

/**
 * Makes a request to the DeepSeek API
 */
export const makeDeepSeekRequest = async (
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
