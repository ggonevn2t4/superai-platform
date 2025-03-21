
import React from 'react';
import ChatMessages from './ChatMessages';
import ChatLoading from './ChatLoading';
import { Message } from '@/types/chatTypes';

interface ChatContentProps {
  messages: Message[];
  isLoading: boolean;
  onMessageFeedback: (messageId: string, type: 'positive' | 'negative') => void;
  onSelectSuggestedQuestion: (question: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isLoading,
  onMessageFeedback,
  onSelectSuggestedQuestion
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        {isLoading ? (
          <ChatLoading />
        ) : (
          <ChatMessages 
            messages={messages} 
            onMessageFeedback={onMessageFeedback}
            onSelectSuggestedQuestion={onSelectSuggestedQuestion}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ChatContent;
