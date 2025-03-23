
import React, { useRef, useEffect, useState } from 'react';
import { Textarea } from '../../ui/textarea';
import { FileUploadButton } from './';
import { ImageUploadButton } from './';
import { VoiceRecordButton } from './';
import { SendButton } from './';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { ToggleModelButton } from './';

interface ChatInputContainerProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  charCount: number;
  model: string;
  isReadOnly?: boolean;
  showAdvancedOptions: boolean;
  toggleAdvancedOptions: () => void;
}

const ChatInputContainer: React.FC<ChatInputContainerProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit,
  apiKeyError,
  charCount,
  model,
  isReadOnly = false,
  showAdvancedOptions,
  toggleAdvancedOptions
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);
  const isMobile = useIsMobile();
  
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
  
  useEffect(() => {
    // Add CSS for collapsible components
    const style = document.createElement('style');
    style.innerHTML = `
      .collapsible-closed {
        display: inline-block;
      }
      .collapsible-open {
        display: none;
      }
      [data-state="open"] .collapsible-closed {
        display: none;
      }
      [data-state="open"] .collapsible-open {
        display: inline-block;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isLoading || !input.trim() || (apiKeyError && model === 'gemini-2') || isProcessingSpeech) {
        if (!input.trim()) {
          toast({
            title: "Vui lòng nhập nội dung",
            description: "Bạn cần nhập tin nhắn trước khi gửi",
            variant: "destructive",
          });
        }
        return;
      }
      handleSubmit(e);
    }
  };
  
  const handleFileContent = (content: string, fileName: string) => {
    const newValue = `${input}\n\nNội dung tệp "${fileName}":\n${content}${content.length >= 2000 ? '...' : ''}`;
    setInput(newValue);
  };
  
  const handleImageAnalysis = (analysis: string, fileName: string) => {
    const imagePrompt = `[Đã tải lên hình ảnh: ${fileName}]\n\nKết quả phân tích:\n${analysis}`;
    setInput(imagePrompt);
  };
  
  const handleVoiceTranscription = (transcription: string) => {
    const newInputValue = input + (input ? ' ' : '') + transcription;
    setInput(newInputValue);
    setIsProcessingSpeech(false);
  };
  
  if (isReadOnly) {
    return (
      <div className="bg-muted/30 rounded-lg p-3 text-center text-muted-foreground">
        Đây là cuộc trò chuyện chỉ xem. Bạn không thể gửi tin nhắn.
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div className="flex space-x-2">
        <div className="flex gap-2">
          <FileUploadButton 
            onFileContent={handleFileContent} 
            disabled={isLoading || isProcessingSpeech} 
          />
          
          <ImageUploadButton 
            onImageAnalysis={handleImageAnalysis} 
            disabled={isLoading || isProcessingSpeech} 
          />
          
          <ToggleModelButton onClick={toggleAdvancedOptions} />
        </div>
        
        <div className="flex-1 relative glass">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={apiKeyError ? "Quota API Gemini đã hết. Vui lòng thử model khác." : "Nhập tin nhắn của bạn..."}
            className="w-full pl-4 pr-20 py-3 h-12 max-h-[200px] rounded-xl border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
            disabled={isLoading || isProcessingSpeech}
            rows={1}
          />
          
          <div className="absolute right-14 top-3 text-xs text-muted-foreground font-medium">
            {charCount > 0 && `${charCount} ký tự`}
          </div>
          
          <VoiceRecordButton 
            onTranscription={handleVoiceTranscription} 
            disabled={isLoading}
          />
          
          <SendButton 
            disabled={isLoading || !input.trim() || (apiKeyError && model === 'gemini-2') || isProcessingSpeech}
          />
        </div>
      </div>
      
      {(isLoading || isProcessingSpeech) && (
        <div className="mt-4 flex justify-center">
          <div className="animate-pulse flex gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
            <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInputContainer;
