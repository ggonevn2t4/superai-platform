
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';
import { analyzeImage } from '@/services/mediaServices';
import { supabase } from '@/integrations/supabase/client';
import { addMessageToConversation } from '@/services/conversation';
import { toast } from 'sonner';
import { Message, UseChatStateProps, ChatState } from '@/types/chatTypes';
import { getSystemPromptForContext, getWelcomeMessageForContext } from '@/utils/chatUtils';
import { sendMessageToGemini } from '@/services/geminiService';
import { sendMessageToDeepSeek } from '@/services/deepseek';

export type { Message };
export type { UseChatStateProps };

export function useChatState({ 
  initialContext = null, 
  initialMessages = [], 
  conversationId = null 
}: UseChatStateProps = {}): ChatState {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversationId);
  const { user } = useAuth();

  // Initialize with system message based on context if no initial messages
  useEffect(() => {
    if (initialContext && initialMessages.length === 0) {
      const systemPrompt = getSystemPromptForContext(initialContext);
      setMessages([
        {
          id: uuidv4(),
          role: 'system',
          content: systemPrompt,
          timestamp: new Date(),
        },
        {
          id: uuidv4(),
          role: 'assistant',
          content: getWelcomeMessageForContext(initialContext),
          timestamp: new Date(),
        }
      ]);
    }
  }, [initialContext, initialMessages]);

  // Function to try alternative AI services when Supabase function fails
  const tryAlternativeAIServices = async (messageContent: string): Promise<string> => {
    try {
      // First try Gemini
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
      
      // If both fail, throw error
      throw new Error('Các dịch vụ AI thay thế đều không khả dụng.');
    } catch (error) {
      console.error('Lỗi khi sử dụng các dịch vụ AI thay thế:', error);
      throw error;
    }
  };

  const sendMessage = useCallback(async (content: string, imageBase64?: string) => {
    if (!content && !imageBase64) return;

    setIsLoading(true);
    const newMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: content || 'Đã gửi một hình ảnh',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    let assistantContent = '';

    try {
      if (imageBase64) {
        assistantContent = await analyzeImage(imageBase64);
      } else {
        try {
          const { data, error } = await supabase.functions.invoke('openai-chat', {
            body: {
              messages: [...messages, newMessage].map(msg => ({ role: msg.role, content: msg.content })),
              userId: user?.id,
            },
          });

          if (error) {
            console.error('Error from Supabase function:', error);
            toast.error('Gặp lỗi khi kết nối với Supabase function, đang thử phương án dự phòng...');
            // Try using alternative AI services
            assistantContent = await tryAlternativeAIServices(content);
          } else {
            assistantContent = data.choices[0].message.content;
          }
        } catch (error) {
          console.error('Lỗi khi kết nối với Supabase function, đang thử phương án dự phòng:', error);
          toast.error('Đang thử kết nối với dịch vụ AI thay thế...');
          // Try using alternative AI services
          assistantContent = await tryAlternativeAIServices(content);
        }
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      
      // If we have an active conversation, save the messages to the database
      if (activeConversationId && user) {
        await addMessageToConversation(activeConversationId, newMessage);
        await addMessageToConversation(activeConversationId, assistantMessage);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Đã xảy ra lỗi. Vui lòng thử lại hoặc thay đổi mô hình AI trong cài đặt.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, user, activeConversationId]);

  const clear = useCallback(() => {
    setMessages([]);
    setActiveConversationId(null);
  }, []);
  
  const setConversation = useCallback((id: string | null, newMessages: Message[]) => {
    setActiveConversationId(id);
    setMessages(newMessages);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clear,
    activeConversationId,
    setConversation,
  };
}
