
import React from 'react';
import { Conversation } from '@/services/conversation';
import { Button } from '@/components/ui/button';
import { Trash2, Share2, Clock, ListPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ConversationsListProps {
  conversations: Conversation[];
  isLoadingConversations: boolean;
  onLoadConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
  onNewChat: () => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  isLoadingConversations,
  onLoadConversation,
  onDeleteConversation,
  onNewChat
}) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Cuộc trò chuyện</h2>
        <Button variant="ghost" size="sm" onClick={onNewChat}>
          <ListPlus size={16} className="mr-1" />
          Mới
        </Button>
      </div>
      
      <Separator className="my-2" />
      
      {isLoadingConversations ? (
        <div className="py-8 text-center text-muted-foreground">
          <p>Đang tải...</p>
        </div>
      ) : conversations.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          <p>Chưa có cuộc trò chuyện nào</p>
          <p className="text-sm mt-2">Bắt đầu trò chuyện và lưu lại để xem ở đây</p>
        </div>
      ) : (
        <div className="space-y-2 mt-2 max-h-[500px] overflow-y-auto pr-1">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors">
              <button 
                className="flex-1 text-left truncate"
                onClick={() => onLoadConversation(conversation.id)}
              >
                <div className="font-medium truncate">{conversation.title}</div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <Clock size={12} className="mr-1" />
                  {formatDistanceToNow(new Date(conversation.updated_at), { 
                    addSuffix: true,
                    locale: vi 
                  })}
                  {conversation.is_shared && (
                    <span className="ml-2 inline-flex items-center text-primary">
                      <Share2 size={12} className="mr-1" /> Đã chia sẻ
                    </span>
                  )}
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDeleteConversation(conversation.id)}
              >
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationsList;
