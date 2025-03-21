
import { useState, useEffect } from 'react';
import { Message } from '@/types/chatTypes';
import { useChatState } from '@/hooks/useChatState';
import { useConversationLoader } from '@/hooks/useConversationLoader';
import { useChatSettings } from '@/hooks/useChatSettings';
import { useChatActions } from '@/components/chat/ChatActions';

interface UseChatInterfaceProps {
  readOnly?: boolean;
  initialContext?: string | null;
  initialMessages?: Message[];
  initialConversationId?: string | null;
  conversationId?: string;
}

export function useChatInterface({
  readOnly = false,
  initialContext = null,
  initialMessages = [],
  initialConversationId = null,
  conversationId
}: UseChatInterfaceProps) {
  const [conversationTitleState, setConversationTitleState] = useState('Cuộc trò chuyện mới');
  const [isSharedState, setIsSharedState] = useState(false);
  
  // Use directly provided initialMessages and initialConversationId if available
  const initialMsgs = initialMessages.length > 0 ? initialMessages : [];
  const initialConvId = initialConversationId || null;
  
  // Initialize chat state
  const { 
    messages, 
    isLoading: isMessageLoading, 
    sendMessage, 
    clear, 
    activeConversationId, 
    setConversation,
    model: stateModel,
    setModel: setStateModel
  } = useChatState({
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
  useEffect(() => {
    if (conversationTitle !== 'Cuộc trò chuyện mới') {
      setConversationTitleState(conversationTitle);
    }
    if (isShared) {
      setIsSharedState(isShared);
    }
    if (conversationModel !== 'deepseek-r1') {
      setModel(conversationModel);
      setStateModel(conversationModel);
    }
  }, [conversationTitle, isShared, conversationModel, setModel, setStateModel]);
  
  // Sync model changes to chat state
  useEffect(() => {
    setStateModel(model);
  }, [model, setStateModel]);
  
  // Enhanced sendMessage function that includes the current model
  const handleSendMessage = (content: string, imageBase64?: string) => {
    return sendMessage(content, imageBase64, model);
  };
  
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

  return {
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
    sendMessage: handleSendMessage,
    clear,
    handleMessageFeedback,
    handleSelectSuggestedQuestion,
    exportChatHistory,
    saveConversation,
    handleTitleUpdate,
    handleToggleSharing,
  };
}
