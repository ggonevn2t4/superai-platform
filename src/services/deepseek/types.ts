
/**
 * Type definitions for the DeepSeek service
 */

export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface DeepSeekConfig {
  temperature?: number;
  maxTokens?: number;
  skipCache?: boolean;
  model?: string;  // Added model property to fix the error
}

export interface DeepSeekError {
  isError: true;
  code: number;
  message: string;
  status?: string;
}
