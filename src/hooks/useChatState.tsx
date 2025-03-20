import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/components/chat/ChatMessage';
import { sendMessageToGemini, GeminiError } from '@/services/geminiService';
import { sendMessageToDeepSeek, DeepSeekError } from '@/services/deepseekService';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const STORAGE_KEY = 'superai_chat_history';

export const generateSuggestedQuestions = (content: string): string[] => {
  const topics: {[key: string]: string[]} = {
    'ai': [
      'Trí tuệ nhân tạo sẽ phát triển như thế nào trong tương lai?',
      'Làm cách nào AI có thể hỗ trợ trong công việc hàng ngày?',
      'So sánh các mô hình AI hiện đại nhất hiện nay?'
    ],
    'programming': [
      'Ngôn ngữ lập trình nào phù hợp nhất cho người mới bắt đầu?',
      'Làm thế nào để tối ưu hóa hiệu suất của ứng dụng?',
      'Xu hướng lập trình nào đang phổ biến nhất hiện nay?'
    ],
    'data': [
      'Phân tích dữ liệu lớn mang lại lợi ích gì?',
      'Các công cụ trực quan hóa dữ liệu tốt nhất hiện nay?',
      'Làm thế nào để đảm bảo bảo mật dữ liệu cá nhân?'
    ],
    'web': [
      'Các framework front-end phổ biến nhất hiện nay?',
      'Làm thế nào để tối ưu SEO cho website?',
      'Xu hướng thiết kế web nào đang được ưa chuộng?'
    ],
    'mobile': [
      'So sánh phát triển ứng dụng native và cross-platform?',
      'Các công cụ thiết kế UI/UX cho ứng dụng di động?',
      'Làm thế nào để tăng lượt tải ứng dụng trên app store?'
    ]
  };

  const lowerContent = content.toLowerCase();
  const relatedTopics: string[] = [];
  
  if (lowerContent.includes('ai') || lowerContent.includes('trí tuệ') || lowerContent.includes('mô hình')) {
    relatedTopics.push('ai');
  }
  
  if (lowerContent.includes('code') || lowerContent.includes('lập trình') || lowerContent.includes('developer')) {
    relatedTopics.push('programming');
  }
  
  if (lowerContent.includes('dữ liệu') || lowerContent.includes('data') || lowerContent.includes('thông tin')) {
    relatedTopics.push('data');
  }
  
  if (lowerContent.includes('web') || lowerContent.includes('trang') || lowerContent.includes('website')) {
    relatedTopics.push('web');
  }
  
  if (lowerContent.includes('di động') || lowerContent.includes('điện thoại') || lowerContent.includes('app')) {
    relatedTopics.push('mobile');
  }
  
  if (relatedTopics.length === 0) {
    relatedTopics.push('ai', 'programming', 'web');
  }
  
  let allQuestions: string[] = [];
  relatedTopics.forEach(topic => {
    if (topics[topic]) {
      allQuestions = [...allQuestions, ...topics[topic]];
    }
  });
  
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export interface ChatState {
  conversationId: string | null;
  conversationTitle: string;
  isShared: boolean;
  shareLink: string;
  messages: Message[];
  input: string;
  isLoading: boolean;
  model: string;
  isRecording: boolean;
  charCount: number;
  showAdvancedOptions: boolean;
  temperature: number;
  maxTokens: number;
  filterResult: boolean;
  apiKeyError: boolean;
  apiProvider: 'gemini' | 'deepseek' | 'other';
}

export interface ChatActions {
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  toggleRecording: () => void;
  clearChat: () => void;
  exportChatHistory: () => void;
  setModel: (modelId: string) => void;
  setShowAdvancedOptions: (show: boolean) => void;
  handleMessageFeedback: (messageId: string, type: 'positive' | 'negative') => Promise<void>;
  handleSelectSuggestedQuestion: (question: string) => void;
  saveConversation: () => Promise<void>;
  toggleSharing: () => Promise<void>;
  updateConversationTitle: (title: string) => Promise<void>;
}

export const useChatState = (shareId?: string): [ChatState, ChatActions] => {
  const { user } = useAuth();

  // Conversation state
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationTitle, setConversationTitle] = useState<string>('Cuộc trò chuyện mới');
  const [isShared, setIsShared] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>('');
  
  // Messages state
  const [messages, setMessages] = useState<Message[]>(() => {
    if (!shareId) {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      return savedMessages 
        ? JSON.parse(savedMessages) 
        : [{
          id: '1',
          role: 'assistant',
          content: 'Xin chào! Tôi là SuperAI, trợ lý AI toàn diện. Tôi có thể giúp gì cho bạn hôm nay?',
          timestamp: new Date(),
          suggestedQuestions: [
            'Bạn có thể giúp tôi học lập trình không?',
            'Giải thích về trí tuệ nhân tạo là gì?',
            'Các xu hướng công nghệ mới nhất hiện nay?'
          ]
        }];
    }
    return [];
  });
  
  // Input and settings state
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

  // Update character count when input changes
  useEffect(() => {
    setCharCount(input.length);
  }, [input]);
  
  // Update API provider when model changes
  useEffect(() => {
    if (model.includes('gemini')) {
      setApiProvider('gemini');
    } else if (model.includes('deepseek')) {
      setApiProvider('deepseek');
    } else {
      setApiProvider('other');
    }
  }, [model]);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    if (!shareId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, shareId]);

  // Create a new conversation in the database
  const createConversation = async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: conversationTitle || 'Cuộc trò chuyện mới',
          model: model
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setConversationId(data.id);
      
      if (messages.length > 0 && messages[0].role === 'assistant') {
        await supabase
          .from('messages')
          .insert({
            conversation_id: data.id,
            role: messages[0].role,
            content: messages[0].content,
            timestamp: messages[0].timestamp.toISOString()
          });
      }
      
      toast.success('Cuộc trò chuyện mới đã được tạo');
      return data.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Không thể tạo cuộc trò chuyện mới');
      return null;
    }
  };
  
  // Save a message to the database
  const saveMessageToDatabase = async (message: Message, convId: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('messages')
        .insert({
          conversation_id: convId,
          role: message.role,
          content: message.content,
          timestamp: message.timestamp.toISOString(),
          feedback: message.feedback
        });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  // Fetch a shared conversation from the database
  const fetchSharedConversation = async (id: string) => {
    try {
      setIsLoading(true);
      
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .select('*')
        .eq('share_id', id)
        .eq('is_shared', true)
        .single();
      
      if (conversationError) throw conversationError;
      
      if (conversationData) {
        setConversationId(conversationData.id);
        setConversationTitle(conversationData.title);
        setIsShared(true);
        setModel(conversationData.model);
        
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationData.id)
          .order('timestamp', { ascending: true });
        
        if (messagesError) throw messagesError;
        
        if (messagesData && messagesData.length > 0) {
          const formattedMessages = messagesData.map(msg => ({
            id: msg.id,
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
            timestamp: new Date(msg.timestamp),
            feedback: msg.feedback as 'positive' | 'negative' | undefined
          }));
          
          setMessages(formattedMessages);
        }
      } else {
        toast.error('Cuộc trò chuyện không tồn tại hoặc không được chia sẻ');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error fetching shared conversation:', error);
      toast.error('Không thể tải cuộc trò chuyện được chia sẻ');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch shared conversation on mount if shareId is provided
  useEffect(() => {
    if (shareId) {
      fetchSharedConversation(shareId);
    }
  }, [shareId]);

  // Handle submitting a new message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
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
        
        const suggestedQuestions = generateSuggestedQuestions(response);
        
        const assistantMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          suggestedQuestions: suggestedQuestions
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        if (conversationId && user) {
          await saveMessageToDatabase(userMessage, conversationId);
          await saveMessageToDatabase(assistantMessage, conversationId);
          
          await supabase
            .from('conversations')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', conversationId);
        }
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
          id: uuidv4(),
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
        id: uuidv4(),
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

  // Toggle message recording state
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      toast.info('Đang ghi âm giọng nói của bạn...');
    }
  };

  // Clear the chat history
  const clearChat = () => {
    const initialMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: 'Xin chào! Tôi là SuperAI, trợ lý AI toàn diện. Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date(),
      suggestedQuestions: [
        'Bạn có thể giúp tôi học lập trình không?',
        'Giải thích về trí tuệ nhân tạo là gì?',
        'Các xu hướng công nghệ mới nhất hiện nay?'
      ]
    };
    
    setMessages([initialMessage]);
    setConversationId(null);
    setConversationTitle('Cuộc trò chuyện mới');
    setIsShared(false);
    setShareLink('');
    toast.success('Đã xóa lịch sử trò chuyện.');
  };

  // Export the chat history as a JSON file
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

  // Save the current conversation to the database
  const saveConversation = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để lưu cuộc trò chuyện');
      return;
    }
    
    if (messages.length <= 1) {
      toast.error('Chưa có cuộc trò chuyện để lưu');
      return;
    }
    
    try {
      let currentConversationId = conversationId;
      
      if (!currentConversationId) {
        currentConversationId = await createConversation();
        if (!currentConversationId) return;
      }
      
      const newMessages = messages.filter(msg => 
        typeof msg.id === 'string' && msg.id.includes('-')
      );
      
      for (const message of newMessages) {
        await saveMessageToDatabase(message, currentConversationId);
      }
      
      toast.success('Cuộc trò chuyện đã được lưu!');
    } catch (error) {
      console.error('Error saving conversation:', error);
      toast.error('Không thể lưu cuộc trò chuyện');
    }
  };

  // Update the conversation title in the database
  const updateConversationTitle = async (title: string) => {
    if (!user || !conversationId) return;
    
    try {
      await supabase
        .from('conversations')
        .update({ title: title, updated_at: new Date().toISOString() })
        .eq('id', conversationId);
      
      setConversationTitle(title);
    } catch (error) {
      console.error('Error updating conversation title:', error);
    }
  };

  // Toggle sharing the conversation
  const toggleSharing = async () => {
    if (!user || !conversationId) {
      toast.error('Vui lòng lưu cuộc trò chuyện trước khi chia sẻ');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .update({ is_shared: !isShared, updated_at: new Date().toISOString() })
        .eq('id', conversationId)
        .select()
        .single();
      
      if (error) throw error;
      
      setIsShared(data.is_shared);
      
      if (data.is_shared) {
        const shareUrl = `${window.location.origin}/chat/share/${data.share_id}`;
        setShareLink(shareUrl);
        navigator.clipboard.writeText(shareUrl);
        toast.success('Liên kết chia sẻ đã được sao chép vào clipboard!');
      } else {
        setShareLink('');
        toast.success('Đã tắt chia sẻ cuộc trò chuyện');
      }
    } catch (error) {
      console.error('Error toggling sharing status:', error);
      toast.error('Không thể thay đổi trạng thái chia sẻ');
    }
  };

  // Handle giving feedback on a message
  const handleMessageFeedback = async (messageId: string, type: 'positive' | 'negative') => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: type } 
          : msg
      )
    );
    
    if (conversationId && user) {
      try {
        await supabase
          .from('messages')
          .update({ feedback: type })
          .eq('id', messageId);
      } catch (error) {
        console.error('Error updating message feedback:', error);
      }
    }
  };

  // Handle selecting a suggested question
  const handleSelectSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return [
    {
      conversationId,
      conversationTitle,
      isShared,
      shareLink,
      messages,
      input,
      isLoading,
      model,
      isRecording,
      charCount,
      showAdvancedOptions,
      temperature,
      maxTokens,
      filterResult,
      apiKeyError,
      apiProvider
    },
    {
      setInput,
      handleSubmit,
      toggleRecording,
      clearChat,
      exportChatHistory,
      setModel,
      setShowAdvancedOptions,
      handleMessageFeedback,
      handleSelectSuggestedQuestion,
      saveConversation,
      toggleSharing,
      updateConversationTitle
    }
  ];
};

export default useChatState;
