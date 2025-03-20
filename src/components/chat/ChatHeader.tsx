
import React from 'react';
import { RotateCcw, Download, Settings, Filter, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModelSelector from '../ui/ModelSelector';

interface ChatHeaderProps {
  model: string;
  setModel: (model: string) => void;
  clearChat: () => void;
  exportChatHistory: () => void;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  isLoading: boolean;
  apiKeyError: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  model,
  setModel,
  clearChat,
  exportChatHistory,
  showAdvancedOptions,
  setShowAdvancedOptions,
  isLoading,
  apiKeyError
}) => {
  return (
    <>
      {apiKeyError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Quota API Gemini đã hết. Vui lòng thử lại sau hoặc cập nhật API key của bạn.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <ModelSelector onChange={setModel} />
          
          <button
            onClick={clearChat}
            className="p-2 rounded-lg border border-input hover:bg-accent transition-colors flex items-center gap-1 text-sm"
            title="Xóa lịch sử trò chuyện"
          >
            <RotateCcw size={16} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
          
          <button
            onClick={exportChatHistory}
            className="p-2 rounded-lg border border-input hover:bg-accent transition-colors flex items-center gap-1 text-sm"
            title="Xuất lịch sử trò chuyện"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Xuất</span>
          </button>
          
          <button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className={cn(
              "p-2 rounded-lg border border-input hover:bg-accent transition-colors flex items-center gap-1 text-sm",
              showAdvancedOptions ? "bg-accent text-accent-foreground" : ""
            )}
            title="Cài đặt nâng cao"
          >
            <Settings size={16} />
            <span className="hidden sm:inline">Cài đặt</span>
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {isLoading ? 'Đang nhập...' : ''}
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
