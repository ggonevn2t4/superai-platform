
import React from 'react';
import { Bot, ImageIcon } from 'lucide-react';

interface ChatContextHeaderProps {
  chatContext: string | null;
}

const ChatContextHeader: React.FC<ChatContextHeaderProps> = ({ chatContext }) => {
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

  return (
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
  );
};

export default ChatContextHeader;
