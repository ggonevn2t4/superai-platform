
import { OpenRouterError } from '../types';

export const ensureErrorCodeIsNumber = (code: any): number => {
  if (typeof code === 'number') return code;
  if (typeof code === 'string') {
    const parsedCode = parseInt(code, 10);
    return isNaN(parsedCode) ? 500 : parsedCode;
  }
  return 500;
};

export const createErrorResponse = (
  code: number,
  message: string,
  type: string = 'error'
): OpenRouterError => {
  return {
    error: {
      message,
      type,
      code
    },
    statusCode: code
  };
};
