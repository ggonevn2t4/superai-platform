
import { useCallback } from 'react';
import { analyzeImage } from '@/services/mediaServices';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Message } from '@/types/chatTypes';
import { sendMessageToGemini } from '@/services/gemini';
import { sendMessageToDeepSeek } from '@/services/deepseek';
import { sendMessageToOpenRouter, openRouterModelMapping } from '@/services/openrouter';

export function useAIService() {
  // Function to try alternative AI services when Supabase function fails
  const tryAlternativeAIServices = useCallback(async (
    messageContent: string,
    model: string = 'deepseek-r1'
  ): Promise<string> => {
    try {
      // First try OpenRouter if model matches
      if (openRouterModelMapping[model]) {
        console.log('Trying OpenRouter API with model:', openRouterModelMapping[model]);
        const openRouterModel = openRouterModelMapping[model];
        const openRouterResponse = await sendMessageToOpenRouter(messageContent, openRouterModel);
        
        if (typeof openRouterResponse === 'string') {
          return openRouterResponse;
        }
      }
      
      // Then try Gemini
      console.log('OpenRouter failed or not configured for model. Trying Gemini API as fallback...');
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
      // For models available in OpenRouter, try direct API call first
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
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          messages: [...messages, newMessage].map(msg => ({ role: msg.role, content: msg.content })),
          userId: null, // User ID will be provided by Supabase Auth
          model: model || 'deepseek-r1'
        },
      });

      if (error) {
        console.error('Error from Supabase function:', error);
        toast.error('Gặp lỗi khi kết nối với Supabase function, đang thử phương án dự phòng...');
        // Try using alternative AI services
        return await tryAlternativeAIServices(content, model);
      } else {
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.error('Lỗi khi kết nối với Supabase function, đang thử phương án dự phòng:', error);
      toast.error('Đang thử kết nối với dịch vụ AI thay thế...');
      // Try using alternative AI services
      return await tryAlternativeAIServices(content, model);
    }
  }, [tryAlternativeAIServices]);

  return {
    processUserMessage
  };
}
