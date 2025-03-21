
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatInterface from '../components/chat/ChatInterface';
import Layout from '../components/layout/Layout';
import { MessageSquareText, Bot, Share2, Loader2 } from 'lucide-react';
import { getSharedConversation } from '@/services/conversation';
import { Message } from '@/hooks/useChatState';

const SharedChat: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedConversation = async () => {
      if (!shareId) {
        setError('Không tìm thấy mã chia sẻ');
        setIsLoading(false);
        return;
      }

      try {
        const { conversation, messages } = await getSharedConversation(shareId);
        if (conversation && messages.length > 0) {
          setConversation(conversation);
          setMessages(messages);
        } else {
          setError('Không tìm thấy cuộc trò chuyện được chia sẻ');
        }
      } catch (err) {
        console.error('Error loading shared conversation:', err);
        setError('Không thể tải cuộc trò chuyện');
      } finally {
        setIsLoading(false);
      }
    };

    loadSharedConversation();
  }, [shareId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center" style={{ minHeight: "60vh" }}>
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Đang tải cuộc trò chuyện...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center" style={{ minHeight: "60vh" }}>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Không thể tải cuộc trò chuyện</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <Share2 size={16} /> Shared Conversation
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {conversation?.title || 'Cuộc trò chuyện được chia sẻ'}
            </span>
          </h1>
          <p className="text-muted-foreground">
            Xem cuộc trò chuyện được chia sẻ với bạn
          </p>
        </div>
        <ChatInterface 
          readOnly={true} 
          initialMessages={messages}
          initialConversationId={conversation?.id}
        />
      </div>
    </Layout>
  );
};

export default SharedChat;
