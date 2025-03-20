
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import ChatMessage, { Message } from './ChatMessage';
import ModelSelector from '../ui/ModelSelector';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Xin chào! Tôi là SuperAI, trợ lý AI toàn diện. Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('gpt-4o');
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Đây là phản hồi mẫu từ mô hình ${model} cho tin nhắn: "${input}".\n\nTrong phiên bản hoàn chỉnh, tôi sẽ tạo ra câu trả lời thực tế dựa trên mô hình AI được chọn.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
  
  const handleUpload = () => {
    toast.info('Tính năng tải lên tệp sẽ có trong phiên bản tiếp theo.');
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success('Đã dừng ghi âm giọng nói.');
    } else {
      setIsRecording(true);
      toast.info('Đang ghi âm giọng nói của bạn...');
    }
  };
  
  return (
    <div className="relative flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="py-4 px-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <ModelSelector onChange={setModel} />
            <div className="text-sm text-muted-foreground">
              {isLoading ? 'Đang nhập...' : ''}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleUpload}
                className="p-3 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Paperclip size={20} />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn của bạn..."
                  className="w-full pl-4 pr-12 py-3 h-12 max-h-[200px] rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  disabled={isLoading}
                  rows={1}
                />
                
                <button 
                  type="button" 
                  onClick={toggleRecording}
                  className="absolute right-14 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isRecording ? <StopCircle size={20} className="text-red-500" /> : <Mic size={20} />}
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-3 text-primary hover:text-primary/80 transition-colors disabled:text-muted-foreground"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
