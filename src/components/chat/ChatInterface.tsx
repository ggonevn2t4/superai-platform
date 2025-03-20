
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatSettings from './ChatSettings';
import { useChatState } from '@/hooks/useChatState';
import { useAuth } from '@/context/AuthContext';

interface ChatInterfaceProps {
  readOnly?: boolean;
  initialContext?: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  readOnly = false,
  initialContext = null 
}) => {
  const { messages, isLoading, sendMessage, clear } = useChatState(initialContext);
  const { user } = useAuth();
  const [model, setModel] = useState('deepseek-x');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [filterResult, setFilterResult] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);

  const handleMessageFeedback = (messageId: string, type: 'positive' | 'negative') => {
    // Handle message feedback logic
    console.log('Feedback for message', messageId, type);
  };

  const handleSelectSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const exportChatHistory = () => {
    // Export chat history logic
    console.log('Exporting chat history');
  };

  return (
    <div className="chat-container border rounded-lg overflow-hidden bg-card flex flex-col max-h-[800px] h-[calc(100vh-16rem)]">
      <ChatHeader 
        model={model}
        setModel={setModel}
        clearChat={clear}
        exportChatHistory={exportChatHistory}
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
        isLoading={isLoading}
        apiKeyError={apiKeyError}
        isReadOnly={readOnly}
      />
      <ChatMessages 
        messages={messages} 
        onMessageFeedback={handleMessageFeedback}
        onSelectSuggestedQuestion={handleSelectSuggestedQuestion}
      />
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
