
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, StopCircle, RotateCcw, Settings, Download, Filter, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import ChatMessage, { Message } from './ChatMessage';
import ModelSelector from '../ui/ModelSelector';
import { sendMessageToGemini, GeminiError } from '../../services/geminiService';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'superai_chat_history';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    return savedMessages 
      ? JSON.parse(savedMessages) 
      : [{
        id: '1',
        role: 'assistant',
        content: 'Xin chào! Tôi là SuperAI, trợ lý AI toàn diện. Tôi có thể giúp gì cho bạn hôm nay?',
        timestamp: new Date()
      }];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('gemini-2');
  const [isRecording, setIsRecording] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [filterResult, setFilterResult] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    setCharCount(input.length);
  }, [input]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setApiKeyError(false);
    
    try {
      let response: string | GeminiError;
      
      if (model === 'gemini-2') {
        response = await sendMessageToGemini(input, {
          temperature,
          maxOutputTokens: maxTokens
        });
      } else {
        response = `Đây là phản hồi mẫu từ mô hình ${model} cho tin nhắn: "${input}".\n\nTrong phiên bản hoàn chỉnh, tôi sẽ tạo ra câu trả lời thực tế dựa trên mô hình AI được chọn.`;
      }
      
      if (typeof response === 'string') {
        if (filterResult) {
          response = response.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '[Liên kết đã bị lọc]');
        }
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Xử lý các lỗi từ API
        if (response.code === 429) {
          setApiKeyError(true);
          toast.error('Quota API Gemini đã hết. Vui lòng thử lại sau hoặc cập nhật API key.');
        }
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `❌ **Lỗi:** ${response.message}`,
          timestamp: new Date(),
          isError: true
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Lỗi khi xử lý tin nhắn:', error);
      toast.error('Đã xảy ra lỗi khi xử lý tin nhắn của bạn. Vui lòng thử lại sau.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ **Lỗi:** Đã xảy ra lỗi khi xử lý tin nhắn của bạn. Vui lòng thử lại sau.',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success('Đã dừng ghi âm giọng nói.');
    } else {
      setIsRecording(true);
      toast.info('Đang ghi âm giọng nói của bạn...');
    }
  };
  
  const clearChat = () => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Xin chào! Tôi là SuperAI, trợ lý AI toàn diện. Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    toast.success('Đã xóa lịch sử trò chuyện.');
  };
  
  const exportChatHistory = () => {
    const chatData = {
      timestamp: new Date(),
      model: model,
      messages: messages
    };
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(chatData, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `superai-chat-history-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Lịch sử trò chuyện đã được xuất ra tệp.');
  };
  
  const handleMessageFeedback = (messageId: string, type: 'positive' | 'negative') => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: type } 
          : msg
      )
    );
  };
  
  return (
    <div className="relative flex flex-col h-screen">
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
      
      <div className="flex-1 overflow-y-auto pb-32" ref={scrollContainerRef}>
        <div className="py-4 px-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onFeedback={handleMessageFeedback}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <ModelSelector onChange={setModel} defaultModel="gemini-2" />
              
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
          
          {showAdvancedOptions && (
            <div className="mb-4 border rounded-lg p-3 bg-background/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="block text-muted-foreground mb-1">Temperature</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span>{temperature}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-muted-foreground mb-1">Max Tokens</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min="256" 
                    max="4096" 
                    step="256"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span>{maxTokens}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={filterResult}
                    onChange={() => setFilterResult(!filterResult)}
                    className="rounded border-gray-300"
                  />
                  <span className="flex items-center gap-1">
                    <Filter size={16} />
                    Lọc nội dung
                  </span>
                </label>
              </div>
            </div>
          )}
          
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
                    adjustTextareaHeight();
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
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
