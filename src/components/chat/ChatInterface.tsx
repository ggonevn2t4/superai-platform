
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatSettings from './ChatSettings';
import ChatShareHeader from './ChatShareHeader';
import { useChatState, Message } from '@/hooks/useChatState';
import { useConversationLoader } from '@/hooks/useConversationLoader';
import { useChatSettings } from '@/hooks/useChatSettings';
import { useChatActions } from './ChatActions';
import ChatLoading from './ChatLoading';

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
  const [conversationTitleState, setConversationTitleState] = useState('Cuộc trò chuyện mới');
  const [isSharedState, setIsSharedState] = useState(false);
  
  // Use directly provided initialMessages and initialConversationId if available
  const initialMsgs = initialMessages.length > 0 ? initialMessages : [];
  const initialConvId = initialConversationId || null;
  
  // Initialize chat state
  const { messages, isLoading: isMessageLoading, sendMessage, clear, activeConversationId, setConversation } = useChatState({
    initialContext,
    initialMessages: initialMsgs,
    conversationId: initialConvId
  });
  
  // Initialize chat settings
  const { 
    model, setModel, temperature, setTemperature, 
    maxTokens, setMaxTokens, filterResult, setFilterResult,
    showAdvancedOptions, setShowAdvancedOptions, apiKeyError
  } = useChatSettings();
  
  // Load conversation data
  const { 
    isLoading: isLoadingConversation, 
    conversationTitle, 
    isShared, 
    model: conversationModel 
  } = useConversationLoader({
    conversationId, 
    initialMessages, 
    initialConversationId, 
    setConversation
  });
  
  // Set state variables based on loaded data
  useState(() => {
    if (conversationTitle !== 'Cuộc trò chuyện mới') {
      setConversationTitleState(conversationTitle);
    }
    if (isShared) {
      setIsSharedState(isShared);
    }
    if (conversationModel !== 'deepseek-x') {
      setModel(conversationModel);
    }
  });
  
  // Initialize chat actions
  const { 
    handleMessageFeedback, handleSelectSuggestedQuestion, 
    exportChatHistory, saveConversation, 
    updateConversationTitleHandler, toggleSharing 
  } = useChatActions({
    messages,
    activeConversationId,
    setConversation,
    conversationTitle: conversationTitleState,
    isShared: isSharedState,
    model
  });
  
  // Handle sharing toggle with state update
  const handleToggleSharing = async () => {
    const newSharedState = await toggleSharing();
    setIsSharedState(newSharedState);
  };
  
  // Handle conversation title update
  const handleTitleUpdate = async (title: string) => {
    await updateConversationTitleHandler(title);
    setConversationTitleState(title);
  };

  return (
    <div className="chat-container border rounded-lg overflow-hidden bg-card flex flex-col max-h-[800px] h-[calc(100vh-16rem)]">
      {!readOnly && (
        <ChatShareHeader 
          isShared={isSharedState}
          conversationTitle={conversationTitleState}
          conversationId={activeConversationId}
          setConversationTitle={setConversationTitleState}
          updateConversationTitle={handleTitleUpdate}
          toggleSharing={handleToggleSharing}
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
            isLoading={isMessageLoading || isLoadingConversation}
            apiKeyError={apiKeyError}
            isReadOnly={readOnly}
          />
          
          {isLoadingConversation ? (
            <ChatLoading />
          ) : (
            <ChatMessages 
              messages={messages} 
              onMessageFeedback={handleMessageFeedback}
              onSelectSuggestedQuestion={handleSelectSuggestedQuestion}
              isLoading={isLoadingConversation}
            />
          )}
        </div>
      </div>
      <ChatInput 
        input=""
        setInput={() => {}}
        isLoading={isMessageLoading}
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
