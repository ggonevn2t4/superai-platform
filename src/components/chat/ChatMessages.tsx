
import React, { useRef, useEffect } from 'react';
import ChatMessage, { Message } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  onMessageFeedback: (messageId: string, type: 'positive' | 'negative') => void;
  onSelectSuggestedQuestion?: (question: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  onMessageFeedback,
  onSelectSuggestedQuestion
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Filter out any system messages
  const displayMessages = messages.filter(message => message.role !== 'system');
  
  return (
    <div className="py-4 px-4">
      {displayMessages.map((message) => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          onFeedback={onMessageFeedback}
          onSelectSuggestedQuestion={onSelectSuggestedQuestion}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
