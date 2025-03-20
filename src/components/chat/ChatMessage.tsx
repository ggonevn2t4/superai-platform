
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, CheckCheck, Copy } from 'lucide-react';

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
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <button 
            onClick={copyToClipboard} 
            className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
          >
            {copied ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
