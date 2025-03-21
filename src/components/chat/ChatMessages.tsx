
import React, { useRef, useEffect } from 'react';
import ChatMessage, { Message } from './ChatMessage';
import { Loader2 } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
  onMessageFeedback: (messageId: string, type: 'positive' | 'negative') => void;
  onSelectSuggestedQuestion?: (question: string) => void;
  isLoading?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  onMessageFeedback,
  onSelectSuggestedQuestion,
  isLoading = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Filter out any system messages
  const displayMessages = messages.filter(message => message.role !== 'system');
  
  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <span className="ml-2 text-muted-foreground">Đang tải cuộc trò chuyện...</span>
      </div>
    );
  }
  
  return (
    <div className="py-4 px-4">
      {displayMessages.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>Chưa có tin nhắn nào. Hãy bắt đầu trò chuyện!</p>
        </div>
      ) : (
        displayMessages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onFeedback={onMessageFeedback}
            onSelectSuggestedQuestion={onSelectSuggestedQuestion}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
