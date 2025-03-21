
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@supabase/supabase-js';
import { useAuth } from '@/context/AuthContext';
import { analyzeImage } from '@/services/mediaServices';
import { supabase } from '@/integrations/supabase/client';
import { addMessageToConversation } from '@/services/conversationService';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  pending?: boolean;
  translated?: string;
  feedback?: 'positive' | 'negative';
  isError?: boolean;
  suggestedQuestions?: string[];
}

const getSystemPromptForContext = (context: string | null): string => {
  switch(context) {
    case 'market_intelligence':
      return 'Bạn là một trợ lý AI chuyên về phân tích thị trường và chiến lược kinh doanh. Hãy giúp người dùng hiểu về thị trường, xu hướng, cơ hội, và đối thủ cạnh tranh. Cung cấp thông tin và phân tích sâu sắc để hỗ trợ ra quyết định kinh doanh.';
    case 'data_analysis':
      return 'Bạn là một trợ lý AI chuyên về phân tích dữ liệu. Hãy giúp người dùng hiểu và phân tích dữ liệu, tạo báo cáo, và rút ra những hiểu biết quan trọng từ dữ liệu. Hướng dẫn họ về các phương pháp phân tích và công cụ phù hợp.';
    case 'code_advisor':
      return 'Bạn là một trợ lý AI chuyên về lập trình. Hãy giúp người dùng với các vấn đề về code, giải thích các khái niệm lập trình, và cung cấp giải pháp cho các lỗi. Tập trung vào việc giải thích rõ ràng và code sạch.';
    case 'content_creation':
      return 'Bạn là một trợ lý AI chuyên về tạo nội dung. Hãy giúp người dùng viết, chỉnh sửa, và cải thiện nội dung của họ. Cung cấp ý tưởng, gợi ý về văn phong, và hỗ trợ tạo nội dung hấp dẫn cho nhiều mục đích khác nhau.';
    default:
      return 'Bạn là một trợ lý AI hữu ích và thân thiện. Hãy giúp người dùng với bất kỳ câu hỏi hoặc vấn đề nào một cách tốt nhất có thể.';
  }
};

export interface UseChatStateProps {
  initialContext?: string | null;
  initialMessages?: Message[];
  conversationId?: string | null;
}

export function useChatState({ 
  initialContext = null, 
  initialMessages = [], 
  conversationId = null 
}: UseChatStateProps = {}) {
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
          content: `Chào mừng bạn đến với ${initialContext === 'market_intelligence' ? 'Market Intelligence Navigator' : 
                  initialContext === 'data_analysis' ? 'Data Analysis Accelerator' : 
                  initialContext === 'code_advisor' ? 'Intelligent Code Advisor' : 
                  initialContext === 'content_creation' ? 'Content Creation Suite' : 
                  'trợ lý AI'}. Tôi có thể giúp gì cho bạn?`,
          timestamp: new Date(),
        }
      ]);
    }
  }, [initialContext, initialMessages]);

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
        const { data, error } = await supabase.functions.invoke('openai-chat', {
          body: {
            messages: [...messages, newMessage].map(msg => ({ role: msg.role, content: msg.content })),
            userId: user?.id,
          },
        });

        if (error) {
          console.error('Error from Supabase function:', error);
          assistantContent = 'Lỗi khi kết nối với trợ lý AI.';
        } else {
          assistantContent = data.choices[0].message.content;
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
          content: 'Đã xảy ra lỗi. Vui lòng thử lại.',
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
