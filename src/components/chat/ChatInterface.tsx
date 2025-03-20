import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { Message } from './ChatMessage';
import { sendMessageToGemini, GeminiError } from '../../services/geminiService';
import { sendMessageToDeepSeek, DeepSeekError } from '../../services/deepseekService';
import ChatHeader from './ChatHeader';
import ChatSettings from './ChatSettings';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

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
  const [model, setModel] = useState('deepseek-r1');
  const [isRecording, setIsRecording] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [filterResult, setFilterResult] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  const [apiProvider, setApiProvider] = useState<'gemini' | 'deepseek' | 'other'>('deepseek');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);
  
  useEffect(() => {
    setCharCount(input.length);
  }, [input]);
  
  useEffect(() => {
    if (model.includes('gemini')) {
      setApiProvider('gemini');
    } else if (model.includes('deepseek')) {
      setApiProvider('deepseek');
    } else {
      setApiProvider('other');
    }
  }, [model]);
  
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
      let response: string | GeminiError | DeepSeekError;
      
      if (model.includes('gemini')) {
        response = await sendMessageToGemini(input, {
          temperature,
          maxOutputTokens: maxTokens
        });
      } else if (model.includes('deepseek')) {
        response = await sendMessageToDeepSeek(input, {
          temperature,
          maxTokens
        });
      } else {
        response = `Đây là phản hồi mẫu từ mô hình ${model} cho tin nhắn: "${input}".\n\nHiện tại API của mô hình này chưa được tích hợp đầy đủ. Chúng tôi sẽ sớm cập nhật khả năng này trong thời gian tới.`;
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
        if (response.code === 429) {
          setApiKeyError(true);
          if (model.includes('gemini')) {
            toast.error('Quota API Gemini đã hết. Vui lòng thử lại sau hoặc cập nhật API key.');
          } else if (model.includes('deepseek')) {
            toast.error('Quota API DeepSeek đã hết. Vui lòng thử lại sau hoặc cập nhật API key.');
          } else {
            toast.error('Quota API đã hết. Vui lòng thử lại sau hoặc cập nhật API key.');
          }
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
      <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <ChatHeader 
            model={model}
            setModel={setModel}
            clearChat={clearChat}
            exportChatHistory={exportChatHistory}
            showAdvancedOptions={showAdvancedOptions}
            setShowAdvancedOptions={setShowAdvancedOptions}
            isLoading={isLoading}
            apiKeyError={apiKeyError}
            apiProvider={apiProvider}
          />
          
          <ChatSettings 
            showAdvancedOptions={showAdvancedOptions}
            temperature={temperature}
            setTemperature={setTemperature}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
            filterResult={filterResult}
            setFilterResult={setFilterResult}
          />
          
          <ChatInput 
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            apiKeyError={apiKeyError}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            charCount={charCount}
            model={model}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-32" ref={scrollContainerRef}>
        <ChatMessages 
          messages={messages}
          onMessageFeedback={handleMessageFeedback}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
