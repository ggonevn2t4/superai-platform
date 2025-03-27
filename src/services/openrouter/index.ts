import { OpenRouterRequest, OpenRouterResponse, OpenRouterError, OpenRouterMessage } from './types';
import { makeOpenRouterRequest } from './utils/requestHandler';

/**
 * Sends a message to OpenRouter API and returns the response
 * @param content The message content to send
 * @param modelName Optional model name, defaults to claude-3-opus-20240229
 * @param temperature Optional temperature parameter for generation
 * @param maxTokens Optional max tokens parameter for generation
 * @returns A promise that resolves to the generated text or an error message
 */
export const sendMessageToOpenRouter = async (
  content: string,
  modelName: string = 'anthropic/claude-3-opus:beta',
  temperature: number = 0.7,
  maxTokens: number = 2048
): Promise<string | OpenRouterError> => {
  // Create messages in the format expected by OpenRouter
  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: 'Bạn là trợ lý AI thông minh, hữu ích và thân thiện. Hãy trả lời đầy đủ, chi tiết và chính xác các câu hỏi của người dùng bằng tiếng Việt.'
    },
    {
      role: 'user',
      content
    }
  ];

  // Prepare request body
  const requestBody: OpenRouterRequest = {
    model: modelName,
    messages,
    temperature,
    max_tokens: maxTokens
  };

  try {
    // Make request to OpenRouter API
    const response = await makeOpenRouterRequest(requestBody);

    // Check if response is an error
    if ('error' in response) {
      console.error('OpenRouter API error:', response.error);
      return response;
    }

    // Extract text from response
    const generatedText = response.choices[0]?.message?.content || '';
    return generatedText;
  } catch (error) {
    console.error('Error sending message to OpenRouter:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 500
      },
      statusCode: 500
    };
  }
};

// OpenRouter model mapping for compatibility with our UI
export const openRouterModelMapping: Record<string, string> = {
  'gpt-4o': 'openai/gpt-4o',
  'gpt-4o-mini': 'openai/gpt-4o-mini',
  'gemini-2': 'google/gemini-1.5-pro-latest',
  'gemini-2-flash': 'google/gemini-1.5-flash-latest',
  'gemini-2-5-pro': 'google/gemini-pro-2-5-latest',
  'claude-3-7': 'anthropic/claude-3-opus:beta',
  'claude-3-5-haiku': 'anthropic/claude-3-haiku:beta',
  'mistral-large': 'mistralai/mistral-large-latest',
  'llama-3-70b': 'meta-llama/llama-3-70b-instruct',
  'deepseek-r1': 'deepseek/deepseek-chat',
  'deepseek-v3': 'deepseek/deepseek-v2',
};
