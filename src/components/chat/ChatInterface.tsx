
import React from 'react';
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

  return (
    <div className="chat-container border rounded-lg overflow-hidden bg-card flex flex-col max-h-[800px] h-[calc(100vh-16rem)]">
      <ChatHeader 
        userName={user?.email || 'Guest'}
        isScrolling={false}
        onClear={clear}
      />
      <ChatMessages messages={messages} isLoading={isLoading} readOnly={readOnly} />
      <ChatInput 
        isLoading={isLoading} 
        onSendMessage={sendMessage} 
        readOnly={readOnly}
      />
      <ChatSettings />
    </div>
  );
};

export default ChatInterface;
