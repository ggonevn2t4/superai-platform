
import React from 'react';
import { Share2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  isShared,
  conversationTitle,
  conversationId,
  setConversationTitle,
  updateConversationTitle,
  toggleSharing,
  saveConversation
}) => {
  return (
    <div className="border-b bg-accent/20 py-2">
      <div className="container mx-auto max-w-4xl px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={conversationTitle}
            onChange={(e) => setConversationTitle(e.target.value)}
            onBlur={() => conversationId && updateConversationTitle(conversationTitle)}
            className="bg-transparent border-none p-1 focus:outline-none focus:ring-1 focus:ring-primary rounded"
            placeholder="Tiêu đề cuộc trò chuyện"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={saveConversation}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Save size={16} />
            <span>{conversationId ? 'Đã lưu' : 'Lưu'}</span>
          </Button>
          
          <Button
            onClick={toggleSharing}
            variant={isShared ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Share2 size={16} />
            <span>{isShared ? 'Đã chia sẻ' : 'Chia sẻ'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatShareHeader;
