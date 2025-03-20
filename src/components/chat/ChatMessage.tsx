import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, CheckCheck, Copy, Code, Globe, Download, ThumbsUp, ThumbsDown, Smile, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  translated?: string;
  feedback?: 'positive' | 'negative';
  isError?: boolean;
}

interface ChatMessageProps {
  message: Message;
  onFeedback?: (messageId: string, type: 'positive' | 'negative') => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  const [copied, setCopied] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState(message.translated || '');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Nội dung đã được sao chép');
  };
  
  const translateMessage = async () => {
    if (translation) {
      setShowTranslation(!showTranslation);
      return;
    }
    
    setIsTranslating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const translatedText = `[Bản dịch] ${message.content}`;
      setTranslation(translatedText);
      setShowTranslation(true);
    } catch (error) {
      toast.error('Không thể dịch tin nhắn. Vui lòng thử lại sau.');
    } finally {
      setIsTranslating(false);
    }
  };
  
  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([message.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `message-${message.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Tin nhắn đã được tải xuống');
  };
  
  const giveFeedback = (type: 'positive' | 'negative') => {
    if (onFeedback) {
      onFeedback(message.id, type);
      toast.success('Cảm ơn bạn đã gửi phản hồi!');
    }
  };

  const prettifyContent = (content: string) => {
    let prettified = content.replace(/[#*]/g, '');
    
    if (message.role === 'assistant' && !message.isError) {
      const shouldAddIcon = Math.random() > 0.7;
      
      if (shouldAddIcon) {
        const icons = [
          <Smile key="smile-icon" className="inline-block mr-1 text-primary" size={16} />,
          <Heart key="heart-icon" className="inline-block mr-1 text-rose-500" size={16} />,
          <Sparkles key="sparkles-icon" className="inline-block mr-1 text-amber-500" size={16} />
        ];
        
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        const paragraphs = prettified.split('\n\n');
        if (paragraphs.length > 0) {
          return (
            <>
              <p key="first-paragraph" className="whitespace-pre-wrap mb-3">
                {randomIcon} {paragraphs[0]}
              </p>
              {paragraphs.slice(1).map((p, i) => (
                <p key={`p-${i}`} className="whitespace-pre-wrap mb-3">{p}</p>
              ))}
            </>
          );
        }
      }
    }
    
    return <p className="whitespace-pre-wrap">{prettified}</p>;
  };
  
  const formatContent = (content: string) => {
    if (!content.includes('```')) {
      return prettifyContent(content);
    }
    
    const parts = content.split(/(```(?:.*?)\n[\s\S]*?```)/g);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            const firstLineEnd = part.indexOf('\n');
            const language = part.substring(3, firstLineEnd).trim();
            const code = part.substring(firstLineEnd + 1, part.length - 3);
            
            return (
              <div key={index} className="my-2 rounded-md bg-muted p-3 font-mono text-sm relative group">
                {language && (
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-t-md absolute top-0 right-0">
                    {language}
                  </div>
                )}
                <pre className="overflow-x-auto">{code}</pre>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      toast.success('Mã đã được sao chép');
                    }} 
                    className="p-1 rounded-md bg-background/80 text-foreground hover:bg-accent transition-colors"
                    title="Sao chép mã"
                  >
                    <Copy size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([code], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = `code-snippet-${index}.${language || 'txt'}`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                      toast.success('Mã đã được tải xuống');
                    }} 
                    className="p-1 rounded-md bg-background/80 text-foreground hover:bg-accent transition-colors"
                    title="Tải xuống mã"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            );
          }
          
          return <div key={index}>{prettifyContent(part)}</div>;
        })}
      </>
    );
  };
  
  return (
    <div 
      className={cn(
        "py-6 flex animate-slide-in-bottom", 
        message.role === 'assistant' ? "bg-muted/30" : ""
      )}
    >
      <div className="container mx-auto max-w-4xl flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className={cn(
            "h-8 w-8 rounded-md flex items-center justify-center",
            message.role === 'assistant' 
              ? "bg-primary text-white" 
              : "bg-secondary text-foreground"
          )}>
            {message.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">
              {message.role === 'assistant' ? 'SuperAI' : 'Bạn'}
            </h3>
            <span className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </span>
            {message.feedback && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                message.feedback === 'positive' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              )}>
                {message.feedback === 'positive' ? 'Hữu ích' : 'Không hữu ích'}
              </span>
            )}
          </div>
          
          <div className="text-sm leading-relaxed">
            {showTranslation ? (
              <div className="bg-accent/30 p-3 rounded-md">
                <p className="whitespace-pre-wrap">{translation}</p>
              </div>
            ) : (
              formatContent(message.content)
            )}
          </div>
          
          {message.role === 'assistant' && !showTranslation && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => giveFeedback('positive')}
                className={cn(
                  "text-sm flex items-center gap-1 px-2 py-1 rounded-md transition-colors",
                  message.feedback === 'positive' 
                    ? "bg-green-100 text-green-800" 
                    : "text-muted-foreground hover:bg-accent/50"
                )}
                disabled={message.feedback === 'negative'}
              >
                <ThumbsUp size={14} /> Hữu ích
              </button>
              
              <button
                onClick={() => giveFeedback('negative')}
                className={cn(
                  "text-sm flex items-center gap-1 px-2 py-1 rounded-md transition-colors",
                  message.feedback === 'negative' 
                    ? "bg-red-100 text-red-800" 
                    : "text-muted-foreground hover:bg-accent/50"
                )}
                disabled={message.feedback === 'positive'}
              >
                <ThumbsDown size={14} /> Không hữu ích
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 flex gap-2">
          <button 
            onClick={copyToClipboard} 
            className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
            title="Sao chép nội dung"
          >
            {copied ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
          
          <button 
            onClick={translateMessage} 
            className={cn(
              "text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors",
              showTranslation && "text-primary"
            )}
            title={showTranslation ? "Hiển thị bản gốc" : "Dịch tin nhắn"}
            disabled={isTranslating}
          >
            <Globe size={16} className={isTranslating ? "animate-spin" : ""} />
          </button>
          
          <button 
            onClick={downloadAsText} 
            className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
            title="Tải xuống tin nhắn"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
