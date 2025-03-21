
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/hooks/useChatState';
import { getCurrentUser, handleError } from './baseService';

export interface Conversation {
  id: string;
  title: string;
  model: string;
  is_shared: boolean;
  share_id: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

// Get all conversations for the current user
export const getUserConversations = async (): Promise<Conversation[]> => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase.from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    handleError(error, 'Không thể tải cuộc trò chuyện');
    return [];
  }
};

// Transform database messages to Message type
const transformDbMessagesToMessages = (messageData: any[]): Message[] => {
  return (messageData || []).map(msg => ({
    id: msg.id,
    role: msg.role as 'user' | 'assistant' | 'system',
    content: msg.content,
    timestamp: new Date(msg.timestamp),
    feedback: msg.feedback as 'positive' | 'negative' | undefined
  }));
};

// Get a conversation by ID, including all messages
export const getConversationWithMessages = async (id: string): Promise<{conversation: Conversation | null, messages: Message[]}> => {
  try {
    // Get the conversation
    const { data: conversation, error: conversationError } = await supabase.from('conversations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (conversationError) throw conversationError;
    
    // Get all messages in this conversation
    const { data: messageData, error: messagesError } = await supabase.from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('timestamp', { ascending: true });
    
    if (messagesError) throw messagesError;
    
    // Transform to Message type
    const messages = transformDbMessagesToMessages(messageData);
    
    return { conversation, messages };
  } catch (error) {
    handleError(error, 'Không thể tải cuộc trò chuyện');
    return { conversation: null, messages: [] };
  }
};

// Get a shared conversation by share_id
export const getSharedConversation = async (shareId: string): Promise<{conversation: Conversation | null, messages: Message[]}> => {
  try {
    // Get the conversation
    const { data: conversation, error: conversationError } = await supabase.from('conversations')
      .select('*')
      .eq('share_id', shareId)
      .eq('is_shared', true)
      .single();
    
    if (conversationError) throw conversationError;
    
    // Get all messages in this conversation
    const { data: messageData, error: messagesError } = await supabase.from('messages')
      .select('*')
      .eq('conversation_id', conversation.id)
      .order('timestamp', { ascending: true });
    
    if (messagesError) throw messagesError;
    
    // Transform to Message type
    const messages = transformDbMessagesToMessages(messageData);
    
    return { conversation, messages };
  } catch (error) {
    handleError(error, 'Không thể tải cuộc trò chuyện được chia sẻ');
    return { conversation: null, messages: [] };
  }
};
