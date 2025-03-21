
import React from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  createConversation, 
  toggleConversationSharing, 
  updateConversationTitle 
} from '@/services/conversation';
import { Message } from '@/types/chatTypes';

interface ChatActionsProps {
  messages: Message[];
  activeConversationId: string | null;
  setConversation: (id: string | null, messages: Message[]) => void;
  conversationTitle: string;
  isShared: boolean;
  model: string;
}

const ChatActions = () => {
  // This component doesn't render anything directly
  // It's a utility that provides action functions
  return null;
};

export const useChatActions = ({
  messages,
  activeConversationId,
  setConversation,
  conversationTitle,
  isShared,
  model
}: ChatActionsProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMessageFeedback = (messageId: string, type: 'positive' | 'negative') => {
    // Handle message feedback logic
    console.log('Feedback for message', messageId, type);
  };

  const handleSelectSuggestedQuestion = (question: string) => {
    // This will be passed down to components that need it
    return question;
  };

  const exportChatHistory = () => {
    // Export chat history logic
    const chatExport = {
      title: conversationTitle,
      messages: messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp
      }))
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chatExport, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${conversationTitle.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  
  const saveConversation = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để lưu cuộc trò chuyện');
      return;
    }
    
    if (activeConversationId) {
      toast.info('Cuộc trò chuyện này đã được lưu');
      return;
    }
    
    if (messages.length <= 1) {
      toast.error('Chưa có tin nhắn nào để lưu');
      return;
    }
    
    const conversationId = await createConversation(conversationTitle, model, messages);
    if (conversationId) {
      setConversation(conversationId, messages);
      // Only redirect if not already in a shared view
      if (!conversationId) {
        navigate(`/chat`);
      }
    }
  };
  
  const updateConversationTitleHandler = async (title: string) => {
    if (!activeConversationId) return;
    
    const success = await updateConversationTitle(activeConversationId, title);
    if (success) {
      toast.success('Đã cập nhật tiêu đề cuộc trò chuyện');
    } else {
      toast.error('Không thể cập nhật tiêu đề');
    }
  };
  
  const toggleSharing = async () => {
    if (!activeConversationId) {
      toast.error('Vui lòng lưu cuộc trò chuyện trước khi chia sẻ');
      return;
    }
    
    const { success, shareId } = await toggleConversationSharing(activeConversationId, isShared);
    
    if (success) {
      if (!isShared && shareId) {
        // Copy the share link to clipboard
        const shareLink = `${window.location.origin}/chat/share/${shareId}`;
        navigator.clipboard.writeText(shareLink);
        toast.success('Đã sao chép link chia sẻ vào clipboard');
      }
      return !isShared;
    }
    return isShared;
  };

  return {
    handleMessageFeedback,
    handleSelectSuggestedQuestion,
    exportChatHistory,
    saveConversation,
    updateConversationTitleHandler,
    toggleSharing
  };
};

export default ChatActions;
