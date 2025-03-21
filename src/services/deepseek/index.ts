
/**
 * Main entry point for the DeepSeek service
 * Re-exports all necessary types and functions for backward compatibility
 */

// Re-export types
export type {
  DeepSeekMessage,
  DeepSeekRequest,
  DeepSeekResponse,
  DeepSeekConfig,
  DeepSeekError
} from './types';

// Re-export configuration
export { DEEPSEEK_API_KEY } from './config';

// Re-export API functions
export {
  sendMessageToDeepSeek,
  sendMessageWithSystemInstructions
} from './api';
