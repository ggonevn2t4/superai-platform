
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/hooks/useChatState';
import { toast } from 'sonner';

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

// Create a new conversation
export const createConversation = async (title: string, model: string, messages: Message[]): Promise<string | null> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.from('conversations')
      .insert({
        title,
        model,
        is_shared: false,
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    
    const conversationId = data.id;
    
    // Insert all messages into the new conversation
    const messageInserts = messages
      .filter(msg => msg.role !== 'system') // Typically don't store system messages
      .map(msg => ({
        conversation_id: conversationId,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString() // Convert Date to ISO string
      }));
    
    if (messageInserts.length > 0) {
      const { error: messagesError } = await supabase.from('messages')
        .insert(messageInserts);
      
      if (messagesError) throw messagesError;
    }
    
    toast.success('Cuộc trò chuyện đã được lưu');
    return conversationId;
  } catch (error) {
    console.error('Error creating conversation:', error);
    toast.error('Không thể lưu cuộc trò chuyện');
    return null;
  }
};

// Get all conversations for the current user
export const getUserConversations = async (): Promise<Conversation[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase.from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
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
    const messages: Message[] = (messageData || []).map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
      timestamp: new Date(msg.timestamp),
      feedback: msg.feedback as 'positive' | 'negative' | undefined
    }));
    
    return { conversation, messages };
  } catch (error) {
    console.error('Error fetching conversation:', error);
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
    const messages: Message[] = (messageData || []).map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
      timestamp: new Date(msg.timestamp),
      feedback: msg.feedback as 'positive' | 'negative' | undefined
    }));
    
    return { conversation, messages };
  } catch (error) {
    console.error('Error fetching shared conversation:', error);
    return { conversation: null, messages: [] };
  }
};

// Update conversation title
export const updateConversationTitle = async (id: string, title: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('conversations')
      .update({ 
        title, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating conversation title:', error);
    return false;
  }
};

// Toggle sharing for a conversation
export const toggleConversationSharing = async (id: string, isCurrentlyShared: boolean): Promise<{success: boolean, shareId?: string}> => {
  try {
    const share_id = !isCurrentlyShared ? uuidv4() : null;
    
    const { data, error } = await supabase.from('conversations')
      .update({ 
        is_shared: !isCurrentlyShared, 
        share_id 
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    const actionText = isCurrentlyShared ? 'riêng tư' : 'chia sẻ';
    toast.success(`Cuộc trò chuyện đã được chuyển thành ${actionText}`);
    
    return { 
      success: true, 
      shareId: data.share_id 
    };
  } catch (error) {
    console.error('Error toggling conversation sharing:', error);
    toast.error('Không thể thay đổi trạng thái chia sẻ');
    return { success: false };
  }
};

// Insert new message to an existing conversation
export const addMessageToConversation = async (conversationId: string, message: Message): Promise<boolean> => {
  try {
    const { error } = await supabase.from('messages')
      .insert({
        conversation_id: conversationId,
        role: message.role,
        content: message.content,
        timestamp: message.timestamp.toISOString() // Convert Date to ISO string
      });
    
    if (error) throw error;
    
    // Update the conversation's updated_at timestamp
    await supabase.from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);
    
    return true;
  } catch (error) {
    console.error('Error adding message to conversation:', error);
    return false;
  }
};

// Delete a conversation and all its messages
export const deleteConversation = async (id: string): Promise<boolean> => {
  try {
    // Delete all messages first (due to foreign key constraints)
    const { error: messagesError } = await supabase.from('messages')
      .delete()
      .eq('conversation_id', id);
    
    if (messagesError) throw messagesError;
    
    // Then delete the conversation
    const { error: conversationError } = await supabase.from('conversations')
      .delete()
      .eq('id', id);
    
    if (conversationError) throw conversationError;
    
    toast.success('Cuộc trò chuyện đã được xóa');
    return true;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    toast.error('Không thể xóa cuộc trò chuyện');
    return false;
  }
};
