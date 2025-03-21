
import React from 'react';
import { MoreHorizontal, Trash2, Settings2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ModelSelector from "@/components/ui/ModelSelector";
import ExportMenu from "@/components/ui/ExportMenu";

interface ChatHeaderProps {
  model: string;
  setModel: (model: string) => void;
  clearChat: () => void;
  exportChatHistory: (format?: 'json' | 'text' | 'markdown') => void;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  isLoading: boolean;
  apiKeyError: boolean;
  isReadOnly?: boolean;
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
  isReadOnly = false
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <ModelSelector 
          defaultModel={model} 
          onChange={setModel} 
          disabled={isLoading || isReadOnly}
        />
      </div>
      
      <div className="flex items-center gap-2">
        {!isReadOnly && (
          <>
            <ExportMenu onExport={exportChatHistory} disabled={isLoading} />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-muted-foreground"
                  disabled={isLoading}
                >
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
                  <Settings2 className="mr-2 h-4 w-4" />
                  <span>Cài đặt nâng cao</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={clearChat}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Xóa cuộc trò chuyện</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
