
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, UseChatStateProps, ChatState } from '@/types/chatTypes';
import { useAuth } from '@/context/AuthContext';
import { addMessageToConversation } from '@/services/conversation';
import { useChatMessages } from './chat/useChatMessages';
import { useAIService } from './chat/useAIService';
import { useChatInitializer } from './chat/useChatInitializer';

export type { Message };
export type { UseChatStateProps };

export function useChatState({ 
  initialContext = null, 
  initialMessages = [], 
  conversationId = null 
}: UseChatStateProps = {}): ChatState {
  const [isLoading, setIsLoading] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversationId);
  const { user } = useAuth();

  // Use smaller, focused hooks
  const { messages, setMessages } = useChatMessages({ initialContext, initialMessages });
  const { processUserMessage } = useAIService();
  
  // Initialize messages with appropriate system prompts based on context
  useChatInitializer({ initialContext, initialMessages, setMessages });

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

    try {
      // Get response from AI service
      const assistantContent = await processUserMessage(content, imageBase64, messages, newMessage);
      
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
  }, [messages, user, activeConversationId, setMessages, processUserMessage]);

  const clear = useCallback(() => {
    setMessages([]);
    setActiveConversationId(null);
  }, [setMessages]);
  
  const setConversation = useCallback((id: string | null, newMessages: Message[]) => {
    setActiveConversationId(id);
    setMessages(newMessages);
  }, [setMessages]);

  return {
    messages,
    isLoading,
    sendMessage,
    clear,
    activeConversationId,
    setConversation,
  };
}
