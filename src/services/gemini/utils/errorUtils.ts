
import { GeminiError } from '../types';

/**
 * Creates a standard error response object
 */
export const createErrorResponse = (code: number, message: string, status?: string): GeminiError => {
  return {
    isError: true,
    code,
    message,
    status
  };
};

/**
 * Chuyển đổi mã lỗi từ bất kỳ kiểu dữ liệu nào sang kiểu number
 */
export const ensureErrorCodeIsNumber = (errorCode: any): number => {
  if (typeof errorCode === 'number') {
    return errorCode;
  }
  
  if (typeof errorCode === 'string') {
    const parsed = parseInt(errorCode, 10);
    return isNaN(parsed) ? 500 : parsed;
  }
  
  return 500; // Mã lỗi mặc định nếu không xác định được
};
