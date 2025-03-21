
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '../components/chat/ChatInterface';
import Layout from '../components/layout/Layout';
import { MessageSquareText, Bot, ImageIcon, Trash2, Share2, Clock, ListPlus } from 'lucide-react';
import { getUserConversations, deleteConversation, Conversation } from '@/services/conversation';
import { useAuth } from '@/context/AuthContext';
import { getConversationWithMessages } from '@/services/conversation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';

const Chat: React.FC = () => {
  const [chatContext, setChatContext] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const context = localStorage.getItem('chatContext');
    setChatContext(context);
    
    // Clear the context after loading it
    if (context) {
      setTimeout(() => {
        localStorage.removeItem('chatContext');
      }, 500);
    }
  }, []);
  
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;
      
      setIsLoadingConversations(true);
      const userConversations = await getUserConversations();
      setConversations(userConversations);
      setIsLoadingConversations(false);
    };
    
    loadConversations();
  }, [user]);
  
  const getContextTitle = () => {
    switch(chatContext) {
      case 'market_intelligence':
        return 'Market Intelligence Navigator';
      case 'data_analysis':
        return 'Data Analysis Accelerator';
      case 'code_advisor':
        return 'Intelligent Code Advisor';
      case 'content_creation':
        return 'Content Creation Suite';
      default:
        return 'Trò chuyện thông minh';
    }
  };
  
  const getContextDescription = () => {
    switch(chatContext) {
      case 'market_intelligence':
        return 'Phân tích thị trường và chiến lược kinh doanh với trợ lý AI';
      case 'data_analysis':
        return 'Phân tích dữ liệu và tạo báo cáo thông minh với AI';
      case 'code_advisor':
        return 'Hỗ trợ lập trình và phát triển mã nguồn mở';
      case 'content_creation':
        return 'Tạo và chỉnh sửa nội dung chuyên nghiệp';
      default:
        return 'Đặt câu hỏi, khám phá kiến thức mới, hay đơn giản là trò chuyện với trợ lý AI của bạn';
    }
  };

  const handleLoadConversation = async (conversationId: string) => {
    const { conversation, messages } = await getConversationWithMessages(conversationId);
    if (conversation && messages.length > 0) {
      navigate(`/chat/${conversationId}`);
    } else {
      toast.error('Không thể tải cuộc trò chuyện');
    }
  };
  
  const handleDeleteConversation = async (conversationId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuộc trò chuyện này?')) {
      const success = await deleteConversation(conversationId);
      if (success) {
        setConversations(conversations.filter(c => c.id !== conversationId));
      }
    }
  };
  
  const handleNewChat = () => {
    navigate('/chat');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <Bot size={16} /> AI Assistant
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{getContextTitle()}</span>
          </h1>
          <p className="text-muted-foreground">
            {getContextDescription()}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="inline-flex items-center gap-2 bg-accent/50 px-3 py-1.5 rounded-full text-muted-foreground text-xs">
              <ImageIcon size={14} /> Phân tích hình ảnh
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Cuộc trò chuyện</h2>
                <Button variant="ghost" size="sm" onClick={handleNewChat}>
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
                        onClick={() => handleLoadConversation(conversation.id)}
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
                        onClick={() => handleDeleteConversation(conversation.id)}
                      >
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-3">
            <ChatInterface initialContext={chatContext} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
