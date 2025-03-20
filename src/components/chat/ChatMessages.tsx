
import React, { useRef, useEffect } from 'react';
import ChatMessage, { Message } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  onMessageFeedback: (messageId: string, type: 'positive' | 'negative') => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, onMessageFeedback }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="py-4 px-4">
      {messages.map((message) => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          onFeedback={onMessageFeedback}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
