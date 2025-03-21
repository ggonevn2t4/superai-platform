
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatSettings from './ChatSettings';
import ChatShareHeader from './ChatShareHeader';
import { useChatState } from '@/hooks/useChatState';
import { useAuth } from '@/context/AuthContext';
import { createConversation, getConversationWithMessages, getSharedConversation, toggleConversationSharing, updateConversationTitle, getUserConversations } from '@/services/conversationService';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  readOnly?: boolean;
  initialContext?: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  readOnly = false,
  initialContext = null 
}) => {
  const navigate = useNavigate();
  const { shareId } = useParams<{ shareId: string }>();
  const [isLoadingConversation, setIsLoadingConversation] = useState(shareId ? true : false);
  const [model, setModel] = useState('deepseek-x');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [filterResult, setFilterResult] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  const [conversationTitle, setConversationTitle] = useState('Cuộc trò chuyện mới');
  const [isShared, setIsShared] = useState(false);
  
  const [initialMessages, setInitialMessages] = useState([]);
  const [initialConversationId, setInitialConversationId] = useState<string | null>(null);
  
  const { messages, isLoading, sendMessage, clear, activeConversationId, setConversation } = useChatState({
    initialContext,
    initialMessages,
    conversationId: initialConversationId
  });
  
  const { user } = useAuth();
  
  // Load shared conversation if shareId is provided
  useEffect(() => {
    const loadSharedConversation = async () => {
      if (!shareId) return;
      
      setIsLoadingConversation(true);
      const { conversation, messages } = await getSharedConversation(shareId);
      
      if (conversation && messages.length > 0) {
        setModel(conversation.model);
        setConversationTitle(conversation.title);
        setIsShared(conversation.is_shared);
        setInitialMessages(messages);
        setInitialConversationId(conversation.id);
      } else {
        toast.error('Không tìm thấy cuộc trò chuyện được chia sẻ');
        navigate('/chat');
      }
      
      setIsLoadingConversation(false);
    };
    
    if (shareId) {
      loadSharedConversation();
    }
  }, [shareId, navigate]);
  
  const handleMessageFeedback = (messageId: string, type: 'positive' | 'negative') => {
    // Handle message feedback logic
    console.log('Feedback for message', messageId, type);
  };

  const handleSelectSuggestedQuestion = (question: string) => {
    sendMessage(question);
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
      // Navigate to the saved conversation
      if (!shareId) { // Only redirect if not already in a shared view
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
      // Reset to the previous title
      setConversationTitle(conversationTitle);
    }
  };
  
  const toggleSharing = async () => {
    if (!activeConversationId) {
      toast.error('Vui lòng lưu cuộc trò chuyện trước khi chia sẻ');
      return;
    }
    
    const { success, shareId } = await toggleConversationSharing(activeConversationId, isShared);
    
    if (success) {
      setIsShared(!isShared);
      
      if (!isShared && shareId) {
        // Copy the share link to clipboard
        const shareLink = `${window.location.origin}/chat/share/${shareId}`;
        navigator.clipboard.writeText(shareLink);
        toast.success('Đã sao chép link chia sẻ vào clipboard');
      }
    }
  };

  return (
    <div className="chat-container border rounded-lg overflow-hidden bg-card flex flex-col max-h-[800px] h-[calc(100vh-16rem)]">
      {!readOnly && (
        <ChatShareHeader 
          isShared={isShared}
          conversationTitle={conversationTitle}
          conversationId={activeConversationId}
          setConversationTitle={setConversationTitle}
          updateConversationTitle={updateConversationTitleHandler}
          toggleSharing={toggleSharing}
          saveConversation={saveConversation}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <ChatHeader 
            model={model}
            setModel={setModel}
            clearChat={clear}
            exportChatHistory={exportChatHistory}
            showAdvancedOptions={showAdvancedOptions}
            setShowAdvancedOptions={setShowAdvancedOptions}
            isLoading={isLoading || isLoadingConversation}
            apiKeyError={apiKeyError}
            isReadOnly={readOnly}
          />
          <ChatMessages 
            messages={messages} 
            onMessageFeedback={handleMessageFeedback}
            onSelectSuggestedQuestion={handleSelectSuggestedQuestion}
            isLoading={isLoadingConversation}
          />
        </div>
      </div>
      <ChatInput 
        input=""
        setInput={() => {}}
        isLoading={isLoading}
        handleSubmit={(e) => {
          e.preventDefault();
          const textArea = e.currentTarget.querySelector('textarea');
          if (textArea && textArea.value.trim()) {
            sendMessage(textArea.value.trim());
            textArea.value = '';
          }
        }}
        apiKeyError={apiKeyError}
        isRecording={false}
        toggleRecording={() => {}}
        charCount={0}
        model={model}
        isReadOnly={readOnly}
      />
      <ChatSettings 
        showAdvancedOptions={showAdvancedOptions}
        temperature={temperature}
        setTemperature={setTemperature}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        filterResult={filterResult}
        setFilterResult={setFilterResult}
      />
    </div>
  );
};

export default ChatInterface;
