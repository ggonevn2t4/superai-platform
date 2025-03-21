
/**
 * Main entry point for the Gemini service
 * Re-exports all necessary types and functions for backward compatibility
 */

// Re-export types
export type {
  GeminiMessage,
  GeminiRequest,
  GeminiResponse,
  GeminiConfig,
  GeminiError
} from './types';

// Re-export configuration
export { GEMINI_API_KEY } from './config';

// Re-export API functions
export {
  sendMessageToGemini,
  sendMessageWithSystemInstructions
} from './api';
