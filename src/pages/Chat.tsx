
import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import Layout from '../components/layout/Layout';
import { MessageSquareText, Bot, ImageIcon, Mic, Volume2 } from 'lucide-react';

const Chat: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <Bot size={16} /> AI Assistant
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Trò chuyện thông minh</span>
          </h1>
          <p className="text-muted-foreground">
            Đặt câu hỏi, khám phá kiến thức mới, hay đơn giản là trò chuyện với trợ lý AI của bạn
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="inline-flex items-center gap-2 bg-accent/50 px-3 py-1.5 rounded-full text-muted-foreground text-xs">
              <ImageIcon size={14} /> Phân tích hình ảnh
            </div>
            <div className="inline-flex items-center gap-2 bg-accent/50 px-3 py-1.5 rounded-full text-muted-foreground text-xs">
              <Mic size={14} /> Nhận diện giọng nói
            </div>
            <div className="inline-flex items-center gap-2 bg-accent/50 px-3 py-1.5 rounded-full text-muted-foreground text-xs">
              <Volume2 size={14} /> Chuyển văn bản thành giọng nói
            </div>
          </div>
        </div>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
