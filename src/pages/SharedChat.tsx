
import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import Layout from '../components/layout/Layout';
import { MessageSquareText, Bot, Share2 } from 'lucide-react';

const SharedChat: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <Share2 size={16} /> Shared Conversation
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Cuộc trò chuyện được chia sẻ</span>
          </h1>
          <p className="text-muted-foreground">
            Xem cuộc trò chuyện được chia sẻ với bạn
          </p>
        </div>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default SharedChat;
