
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatShareHeader from './ChatShareHeader';
import ChatContent from './ChatContent';
import ChatForm from './ChatForm';
import { Message } from '@/hooks/useChatState';
import { useChatInterface } from '@/hooks/useChatInterface';

interface ChatInterfaceProps {
  readOnly?: boolean;
  initialContext?: string | null;
  initialMessages?: Message[];
  initialConversationId?: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  readOnly = false,
  initialContext = null,
  initialMessages = [],
  initialConversationId = null
}) => {
  const { conversationId } = useParams<{ conversationId: string }>();
  
  const {
    // States
    conversationTitleState,
    isSharedState,
    messages,
    isMessageLoading,
    isLoadingConversation,
    activeConversationId,
    model,
    temperature,
    maxTokens,
    filterResult,
    showAdvancedOptions,
    apiKeyError,
    
    // Actions and handlers
    setModel,
    setTemperature,
    setMaxTokens,
    setFilterResult,
    setShowAdvancedOptions,
    sendMessage,
    clear,
    handleMessageFeedback,
    handleSelectSuggestedQuestion,
    exportChatHistory,
    saveConversation,
    handleTitleUpdate,
    handleToggleSharing,
  } = useChatInterface({
    readOnly,
    initialContext,
    initialMessages,
    initialConversationId,
    conversationId
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textArea = e.currentTarget.querySelector('textarea');
    if (textArea && textArea.value.trim()) {
      sendMessage(textArea.value.trim());
      textArea.value = '';
    }
  };

  return (
    <div className="chat-container border rounded-lg overflow-hidden bg-card flex flex-col max-h-[800px] h-[calc(100vh-16rem)]">
      {!readOnly && activeConversationId && (
        <ChatShareHeader 
          isShared={isSharedState}
          conversationTitle={conversationTitleState}
          conversationId={activeConversationId}
          setConversationTitle={conversationTitleState => {}}
          updateConversationTitle={handleTitleUpdate}
          toggleSharing={handleToggleSharing}
          saveConversation={saveConversation}
        />
      )}
      
      <ChatContent 
        messages={messages}
        isLoading={isLoadingConversation}
        onMessageFeedback={handleMessageFeedback}
        onSelectSuggestedQuestion={handleSelectSuggestedQuestion}
      />
      
      <ChatHeader 
        model={model}
        setModel={setModel}
        clearChat={clear}
        exportChatHistory={exportChatHistory}
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
        isLoading={isMessageLoading || isLoadingConversation}
        apiKeyError={apiKeyError}
        isReadOnly={readOnly}
      />
      
      <ChatForm 
        isLoading={isMessageLoading}
        handleSubmit={handleSubmit}
        apiKeyError={apiKeyError}
        model={model}
        isReadOnly={readOnly}
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
