
import { DeepSeekResponse, DeepSeekError } from '../types';
import { createErrorResponse } from './errorUtils';

/**
 * Process the DeepSeek API response
 */
export const processDeepSeekResponse = (data: DeepSeekResponse | DeepSeekError): string | DeepSeekError => {
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
