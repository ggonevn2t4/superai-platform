
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatShareHeader from './ChatShareHeader';
import ChatReadOnlyBanner from './ChatReadOnlyBanner';
import { useChatState } from '@/hooks/useChatState';
import { cacheService } from '@/services/cacheService';
import { Badge } from '@/components/ui/badge';
import { Server } from 'lucide-react';
import UserSettingsPanel from '@/components/settings/UserSettingsPanel';

const ChatInterface: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { shareId } = useParams<{ shareId?: string }>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cacheHits, setCacheHits] = useState<number>(0);
  
  const [state, actions] = useChatState(shareId);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);
  
  // Monitor cache hits
  useEffect(() => {
    // This is a proxy to listen for 'get' operations on the cache
    const originalGet = cacheService.get;
    cacheService.get = function<T>(key: string): T | null {
      const result = originalGet.call(this, key);
      if (result !== null) {
        setCacheHits(prev => prev + 1);
      }
      return result;
    };
    
    return () => {
      // Restore original method
      cacheService.get = originalGet;
    };
  }, []);
  
  const isReadOnly = !!shareId && !user;
  
  return (
    <div className="relative flex flex-col h-screen">
      {shareId && (
        <ChatReadOnlyBanner isShared={state.isShared} />
      )}
      
      {user && !state.isShared && !shareId && (
        <ChatShareHeader 
          isShared={state.isShared}
          conversationTitle={state.conversationTitle}
          conversationId={state.conversationId}
          setConversationTitle={(title) => actions.updateConversationTitle(title)}
          updateConversationTitle={actions.updateConversationTitle}
          toggleSharing={actions.toggleSharing}
          saveConversation={actions.saveConversation}
        />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChatHeader 
                model={state.model}
                setModel={actions.setModel}
                clearChat={actions.clearChat}
                exportChatHistory={actions.exportChatHistory}
                showAdvancedOptions={state.showAdvancedOptions}
                setShowAdvancedOptions={actions.setShowAdvancedOptions}
                isLoading={state.isLoading}
                apiKeyError={state.apiKeyError}
                apiProvider={state.apiProvider}
                isReadOnly={isReadOnly}
              />
              
              {cacheHits > 0 && (
                <Badge variant="outline" className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 flex items-center gap-1">
                  <Server size={12} />
                  <span>Cache: {cacheHits} hits</span>
                </Badge>
              )}
            </div>
            
            {user && <UserSettingsPanel />}
          </div>
          
          <ChatInput 
            input={state.input}
            setInput={actions.setInput}
            isLoading={state.isLoading}
            handleSubmit={actions.handleSubmit}
            apiKeyError={state.apiKeyError}
            isRecording={state.isRecording}
            toggleRecording={actions.toggleRecording}
            charCount={state.charCount}
            model={state.model}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-32" ref={scrollContainerRef}>
        <ChatMessages 
          messages={state.messages}
          onMessageFeedback={actions.handleMessageFeedback}
          onSelectSuggestedQuestion={actions.handleSelectSuggestedQuestion}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
