
import React, { useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, StopCircle } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  isRecording: boolean;
  toggleRecording: () => void;
  charCount: number;
  model: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit,
  apiKeyError,
  isRecording,
  toggleRecording,
  charCount,
  model
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Tệp quá lớn. Vui lòng tải lên tệp có kích thước dưới 5MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const fileContent = event.target.result.toString().slice(0, 2000);
        setInput(prev => `${prev}\n\nNội dung tệp "${file.name}":\n${fileContent}${fileContent.length >= 2000 ? '...' : ''}`);
        toast.success(`Đã tải lên tệp ${file.name}`);
      }
    };
    reader.onerror = () => {
      toast.error('Không thể đọc tệp. Vui lòng thử lại.');
    };
    
    if (file.type.startsWith('text/')) {
      reader.readAsText(file);
    } else {
      toast.error('Hiện tại chỉ hỗ trợ tệp văn bản.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".txt,.md,.csv,.json"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Tải lên tệp"
        >
          <Paperclip size={20} />
        </button>
        
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={apiKeyError ? "Quota API Gemini đã hết. Vui lòng thử model khác." : "Nhập tin nhắn của bạn..."}
            className="w-full pl-4 pr-12 py-3 h-12 max-h-[200px] rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            disabled={isLoading}
            rows={1}
          />
          
          <div className="absolute right-24 top-3 text-xs text-muted-foreground">
            {charCount > 0 && `${charCount} ký tự`}
          </div>
          
          <button 
            type="button" 
            onClick={toggleRecording}
            className="absolute right-14 top-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isRecording ? <StopCircle size={20} className="text-red-500" /> : <Mic size={20} />}
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !input.trim() || (apiKeyError && model === 'gemini-2')}
            className="absolute right-3 top-3 text-primary hover:text-primary/80 transition-colors disabled:text-muted-foreground"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <div className="animate-pulse flex gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
            <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ChatInput;
