
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, CheckCheck, Copy, Smile, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  translated?: string;
  feedback?: 'positive' | 'negative';
  isError?: boolean;
  suggestedQuestions?: string[];
  pending?: boolean;
}

interface ChatMessageProps {
  message: Message;
  onFeedback?: (messageId: string, type: 'positive' | 'negative') => void;
  onSelectSuggestedQuestion?: (question: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onFeedback,
  onSelectSuggestedQuestion 
}) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Nội dung đã được sao chép');
  };
  
  // We shouldn't render system messages, but adding this check for safety
  if (message.role === 'system') {
    return null;
  }
  
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
            {formatContent(message.content)}
          </div>
          
          {/* Removed the suggested questions section */}
          
          {/* Removed the feedback buttons as requested */}
        </div>
        
        <div className="flex-shrink-0">
          <button 
            onClick={copyToClipboard} 
            className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
            title="Sao chép nội dung"
          >
            {copied ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
