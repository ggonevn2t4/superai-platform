
import { GeminiResponse, GeminiError } from '../types';
import { createErrorResponse } from './errorUtils';

/**
 * Process the Gemini API response
 */
export const processGeminiResponse = (data: GeminiResponse | GeminiError): string | GeminiError => {
  // If it's already an error response, return it directly
  if ('isError' in data) {
    return data;
  }
  
  // Extract the message content from the response
  if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
    return data.candidates[0].content.parts[0].text;
  } else {
    return createErrorResponse(
      0,
      'Không nhận được phản hồi hợp lệ từ Gemini API'
    );
  }
};
