
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, CheckCheck, Copy, Code } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Format content to display code blocks properly
  const formatContent = (content: string) => {
    // Basic markdown-like code block detection with ```
    if (!content.includes('```')) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }
    
    const parts = content.split(/(```(?:.*?)\n[\s\S]*?```)/g);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            // Extract language if specified
            const firstLineEnd = part.indexOf('\n');
            const language = part.substring(3, firstLineEnd).trim();
            const code = part.substring(firstLineEnd + 1, part.length - 3);
            
            return (
              <div key={index} className="my-2 rounded-md bg-muted p-3 font-mono text-sm relative">
                {language && (
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-t-md absolute top-0 right-0">
                    {language}
                  </div>
                )}
                <pre className="overflow-x-auto">{code}</pre>
              </div>
            );
          }
          
          return <p key={index} className="whitespace-pre-wrap">{part}</p>;
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
          </div>
          
          <div className="text-sm leading-relaxed">
            {formatContent(message.content)}
          </div>
        </div>
        
        <div className="flex-shrink-0 flex gap-2">
          <button 
            onClick={copyToClipboard} 
            className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
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
