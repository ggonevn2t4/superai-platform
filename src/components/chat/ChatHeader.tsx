
import React from 'react';
import { RotateCcw, Download, Settings, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModelSelector from '../ui/ModelSelector';
import { Button } from '../ui/button';

interface ChatHeaderProps {
  model: string;
  setModel: (model: string) => void;
  clearChat: () => void;
  exportChatHistory: () => void;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  isLoading: boolean;
  apiKeyError: boolean;
  apiProvider?: 'gemini' | 'deepseek' | 'other';
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  model,
  setModel,
  clearChat,
  exportChatHistory,
  showAdvancedOptions,
  setShowAdvancedOptions,
  isLoading,
  apiKeyError,
  apiProvider = 'deepseek'
}) => {
  return (
    <>
      {apiKeyError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4 animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {apiProvider === 'gemini' 
                  ? 'Quota API Gemini đã hết. Vui lòng thử lại sau hoặc cập nhật API key của bạn.'
                  : apiProvider === 'deepseek'
                  ? 'Quota API DeepSeek đã hết. Vui lòng thử lại sau hoặc cập nhật API key của bạn.'
                  : 'Quota API đã hết. Vui lòng thử lại sau hoặc cập nhật API key của bạn.'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <ModelSelector onChange={setModel} defaultModel={model} />
          
          <Button
            onClick={clearChat}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 backdrop-blur-sm bg-background/80"
            title="Xóa lịch sử trò chuyện"
          >
            <RotateCcw size={16} />
            <span className="hidden sm:inline">Làm mới</span>
          </Button>
          
          <Button
            onClick={exportChatHistory}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 backdrop-blur-sm bg-background/80"
            title="Xuất lịch sử trò chuyện"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Xuất</span>
          </Button>
          
          <Button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            variant={showAdvancedOptions ? "secondary" : "outline"}
            size="sm"
            className="flex items-center gap-1.5 backdrop-blur-sm bg-background/80"
            title="Cài đặt nâng cao"
          >
            <Settings size={16} />
            <span className="hidden sm:inline">Cài đặt</span>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground font-medium">
          {isLoading ? (
            <span className="flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Đang nhập...
            </span>
          ) : ''}
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
