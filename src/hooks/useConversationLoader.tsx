
import { useState, useEffect } from 'react';
import { Message } from '@/types/chatTypes';
import { getConversationWithMessages } from '@/services/conversation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UseConversationLoaderProps {
  conversationId: string | undefined;
  initialMessages: Message[];
  initialConversationId: string | null;
  setConversation: (id: string | null, messages: Message[]) => void;
}

interface ConversationData {
  isLoading: boolean;
  conversationTitle: string;
  isShared: boolean;
  model: string;
}

export function useConversationLoader({
  conversationId,
  initialMessages,
  initialConversationId,
  setConversation
}: UseConversationLoaderProps): ConversationData {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(conversationId ? true : false);
  const [conversationTitle, setConversationTitle] = useState('Cuộc trò chuyện mới');
  const [isShared, setIsShared] = useState(false);
  const [model, setModel] = useState('deepseek-x');

  // Load conversation if conversationId is provided and no initialMessages
  useEffect(() => {
    const loadConversation = async () => {
      if (!conversationId || initialMessages.length > 0) return;
      
      setIsLoading(true);
      const { conversation, messages } = await getConversationWithMessages(conversationId);
      
      if (conversation && messages.length > 0) {
        setModel(conversation.model);
        setConversationTitle(conversation.title);
        setIsShared(conversation.is_shared);
        setConversation(conversation.id, messages);
      } else {
        toast.error('Không tìm thấy cuộc trò chuyện');
        navigate('/chat');
      }
      
      setIsLoading(false);
    };
    
    if (conversationId) {
      loadConversation();
    }
  }, [conversationId, navigate, setConversation, initialMessages.length]);
  
  // Set title and shared status from initialConversationId if available
  useEffect(() => {
    if (initialConversationId && initialMessages.length > 0) {
      const loadConversationDetails = async () => {
        try {
          const { data, error } = await supabase.from('conversations')
            .select('title, is_shared')
            .eq('id', initialConversationId)
            .single();
            
          if (!error && data) {
            setConversationTitle(data.title);
            setIsShared(data.is_shared);
          }
        } catch (err) {
          console.error('Error loading conversation details:', err);
        }
      };
      
      loadConversationDetails();
    }
  }, [initialConversationId, initialMessages.length]);

  return {
    isLoading,
    conversationTitle,
    isShared,
    model
  };
}
