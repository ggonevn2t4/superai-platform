
import React from 'react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
  clearChat,
  exportChatHistory,
  isLoading,
  isReadOnly = false
}) => {
  return (
    <div className="flex items-center justify-end mb-4">
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
