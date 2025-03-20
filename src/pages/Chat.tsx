
import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import Layout from '../components/layout/Layout';

const Chat: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <span className="text-primary">Trò chuyện thông minh</span>
        </h1>
        <p className="text-muted-foreground mb-6">
          Đặt câu hỏi, khám phá kiến thức mới, hay đơn giản là trò chuyện với trợ lý AI của bạn
        </p>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
