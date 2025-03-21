
import { DeepSeekError } from '../types';

/**
 * Creates a standard error response object
 */
export const createErrorResponse = (code: number, message: string, status?: string): DeepSeekError => {
  return {
    isError: true,
    code,
    message,
    status
  };
};
