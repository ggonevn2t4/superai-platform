
import React from 'react';

interface ChatShareHeaderProps {
  isShared: boolean;
  conversationTitle: string;
  conversationId: string | null;
  setConversationTitle: (title: string) => void;
  updateConversationTitle: (title: string) => Promise<void>;
  toggleSharing: () => Promise<void>;
  saveConversation: () => Promise<void>;
}

const ChatShareHeader: React.FC<ChatShareHeaderProps> = ({
  conversationTitle,
  conversationId,
  setConversationTitle,
  updateConversationTitle
}) => {
  return (
    <div className="border-b bg-accent/20 py-2">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={conversationTitle}
            onChange={(e) => setConversationTitle(e.target.value)}
            onBlur={() => conversationId && updateConversationTitle(conversationTitle)}
            className="bg-transparent border-none p-1 focus:outline-none focus:ring-1 focus:ring-primary rounded w-full"
            placeholder="Tiêu đề cuộc trò chuyện"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatShareHeader;
