
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/hooks/useChatState';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser, handleError } from './baseService';

// Create a new conversation
export const createConversation = async (title: string, model: string, messages: Message[]): Promise<string | null> => {
  try {
    // Get the current user
    const user = await getCurrentUser();
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
    handleError(error, 'Không thể lưu cuộc trò chuyện');
    return null;
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
    handleError(error, 'Không thể cập nhật tiêu đề');
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
    handleError(error, 'Không thể thay đổi trạng thái chia sẻ');
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
    handleError(error, 'Không thể thêm tin nhắn');
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
    handleError(error, 'Không thể xóa cuộc trò chuyện');
    return false;
  }
};
