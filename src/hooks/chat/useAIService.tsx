
import { useCallback } from 'react';
import { analyzeImage } from '@/services/mediaServices';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Message } from '@/types/chatTypes';
import { sendMessageToGemini } from '@/services/gemini';
import { sendMessageToDeepSeek, sendMessageWithSystemInstructions } from '@/services/deepseek';
import { sendMessageToOpenRouter, openRouterModelMapping } from '@/services/openrouter';
import { DEEPSEEK_MODELS } from '@/services/deepseek/config';

export function useAIService() {
  // Function to try alternative AI services when Supabase function fails
  const tryAlternativeAIServices = useCallback(async (
    messageContent: string,
    model: string = 'deepseek-r1'
  ): Promise<string> => {
    try {
      // First try DeepSeek V3 if that's the requested model
      if (model === 'deepseek-v3') {
        console.log('Trying DeepSeek V3 API directly...');
        const deepseekResponse = await sendMessageWithSystemInstructions(
          messageContent,
          'Bạn là trợ lý AI thông minh, hữu ích và thân thiện. Hãy trả lời đầy đủ, chi tiết và chính xác các câu hỏi của người dùng bằng tiếng Việt.',
          { model: DEEPSEEK_MODELS.V3 },
        );
        
        if (typeof deepseekResponse === 'string') {
          return deepseekResponse;
        }
      }
      
      // Then try OpenRouter if model matches
      if (openRouterModelMapping[model]) {
        console.log('Trying OpenRouter API with model:', openRouterModelMapping[model]);
        const openRouterModel = openRouterModelMapping[model];
        const openRouterResponse = await sendMessageToOpenRouter(messageContent, openRouterModel);
        
        if (typeof openRouterResponse === 'string') {
          return openRouterResponse;
        }
      }
      
      // Try Gemini
      console.log('Trying Gemini API as fallback...');
      const geminiResponse = await sendMessageToGemini(messageContent);
      
      if (typeof geminiResponse === 'string') {
        return geminiResponse;
      }
      
      // If Gemini fails, try DeepSeek
      console.log('Gemini failed, trying DeepSeek API as fallback...');
      const deepseekResponse = await sendMessageToDeepSeek(messageContent);
      
      if (typeof deepseekResponse === 'string') {
        return deepseekResponse;
      }
      
      // If all fail, throw error
      throw new Error('Các dịch vụ AI thay thế đều không khả dụng.');
    } catch (error) {
      console.error('Lỗi khi sử dụng các dịch vụ AI thay thế:', error);
      throw error;
    }
  }, []);

  // Main function to process user message and get AI response
  const processUserMessage = useCallback(async (
    content: string, 
    imageBase64: string | undefined,
    messages: Message[],
    newMessage: Message,
    model: string = 'deepseek-r1'
  ): Promise<string> => {
    if (imageBase64) {
      return await analyzeImage(imageBase64);
    }
    
    try {
      // For DeepSeek V3, use direct API call first
      if (model === 'deepseek-v3') {
        console.log('Using DeepSeek V3 model directly');
        const deepseekResponse = await sendMessageWithSystemInstructions(
          content,
          'Bạn là trợ lý AI thông minh, hữu ích và thân thiện. Hãy trả lời đầy đủ, chi tiết và chính xác các câu hỏi của người dùng bằng tiếng Việt.',
          { model: DEEPSEEK_MODELS.V3 },
        );
        
        if (typeof deepseekResponse === 'string') {
          return deepseekResponse;
        }
      }
      
      // For models available in OpenRouter, try direct API call if not specifically requesting Supabase
      if (openRouterModelMapping[model] && !content.includes("@supabase")) {
        console.log('Using OpenRouter directly for model:', model);
        const openRouterResponse = await sendMessageToOpenRouter(
          content,
          openRouterModelMapping[model]
        );
        
        if (typeof openRouterResponse === 'string') {
          return openRouterResponse;
        }
      }
      
      // Try Supabase function
      try {
        console.log('Trying Supabase function with model:', model);
        const { data, error } = await supabase.functions.invoke('openai-chat', {
          body: {
            messages: [...messages, newMessage].map(msg => ({ role: msg.role, content: msg.content })),
            userId: null, 
            model: model || 'deepseek-r1'
          },
        });

        if (error) {
          console.error('Error from Supabase function:', error);
          throw error;
        } 
        
        return data.choices[0].message.content;
      } catch (error) {
        console.error('Supabase function failed, trying alternative services:', error);
        toast.error('Gặp lỗi khi kết nối với Supabase function, đang thử phương án dự phòng...');
        
        // Try using alternative AI services
        return await tryAlternativeAIServices(content, model);
      }
    } catch (error) {
      console.error('Lỗi khi xử lý tin nhắn:', error);
      toast.error('Đang thử kết nối với dịch vụ AI thay thế...');
      
      // Try using alternative AI services
      return await tryAlternativeAIServices(content, model);
    }
  }, [tryAlternativeAIServices]);

  return {
    processUserMessage
  };
}
