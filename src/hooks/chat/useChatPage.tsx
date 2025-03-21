
import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getUserConversations, deleteConversation, getConversationWithMessages, Conversation } from '@/services/conversation';
import { toast } from 'sonner';
import { cacheService } from '@/services/cacheService';

export function useChatPage() {
  const [chatContext, setChatContext] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Debounce function to prevent excessive API calls
  const debounce = (fn: Function, delay: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      fn();
      debounceTimerRef.current = null;
    }, delay);
  };
  
  const loadConversations = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingConversations(true);
    
    // Check cache first
    const cacheKey = cacheService.generateCacheKey('userConversations', { userId: user.id });
    const cachedConversations = cacheService.get<Conversation[]>(cacheKey);
    
    if (cachedConversations) {
      console.log('Using cached conversations');
      setConversations(cachedConversations);
      setIsLoadingConversations(false);
      
      // Refresh cache in background after 30 seconds
      debounce(async () => {
        try {
          const freshConversations = await getUserConversations();
          cacheService.set(cacheKey, freshConversations, 5 * 60 * 1000); // Cache for 5 minutes
          setConversations(freshConversations);
        } catch (error) {
          console.error('Error refreshing conversations cache:', error);
        }
      }, 30 * 1000);
      return;
    }
    
    try {
      const userConversations = await getUserConversations();
      setConversations(userConversations);
      
      // Cache the result
      cacheService.set(cacheKey, userConversations, 5 * 60 * 1000); // Cache for 5 minutes
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Không thể tải danh sách cuộc trò chuyện');
    } finally {
      setIsLoadingConversations(false);
    }
  }, [user]);
  
  useEffect(() => {
    const context = localStorage.getItem('chatContext');
    setChatContext(context);
    
    // Clear the context after loading it
    if (context) {
      setTimeout(() => {
        localStorage.removeItem('chatContext');
      }, 500);
    }
  }, []);
  
  useEffect(() => {
    loadConversations();
    
    // Set up periodic cache cleaning
    const cleanupInterval = setInterval(() => {
      cacheService.cleanExpired();
    }, 5 * 60 * 1000); // Clean every 5 minutes
    
    return () => {
      clearInterval(cleanupInterval);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [loadConversations]);

  const handleLoadConversation = async (conversationId: string) => {
    // Check cache first
    const cacheKey = cacheService.generateCacheKey('conversationDetail', { conversationId });
    const cachedData = cacheService.get<{conversation: any, messages: any[]}>(cacheKey);
    
    if (cachedData && cachedData.conversation && cachedData.messages.length > 0) {
      console.log('Using cached conversation detail');
      navigate(`/chat/${conversationId}`);
      return;
    }
    
    try {
      const { conversation, messages } = await getConversationWithMessages(conversationId);
      
      if (conversation && messages.length > 0) {
        // Cache the result
        cacheService.set(cacheKey, { conversation, messages }, 2 * 60 * 1000); // Cache for 2 minutes
        navigate(`/chat/${conversationId}`);
      } else {
        toast.error('Không thể tải cuộc trò chuyện');
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast.error('Đã xảy ra lỗi khi tải cuộc trò chuyện');
    }
  };
  
  const handleDeleteConversation = async (conversationId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuộc trò chuyện này?')) {
      try {
        const success = await deleteConversation(conversationId);
        
        if (success) {
          setConversations(conversations.filter(c => c.id !== conversationId));
          
          // Update cache
          if (user) {
            const cacheKey = cacheService.generateCacheKey('userConversations', { userId: user.id });
            const updatedConversations = conversations.filter(c => c.id !== conversationId);
            cacheService.set(cacheKey, updatedConversations, 5 * 60 * 1000);
            
            // Also invalidate the conversation detail cache
            const detailCacheKey = cacheService.generateCacheKey('conversationDetail', { conversationId });
            cacheService.delete(detailCacheKey);
          }
          
          toast.success('Đã xóa cuộc trò chuyện');
        } else {
          toast.error('Không thể xóa cuộc trò chuyện');
        }
      } catch (error) {
        console.error('Error deleting conversation:', error);
        toast.error('Đã xảy ra lỗi khi xóa cuộc trò chuyện');
      }
    }
  };
  
  const handleNewChat = () => {
    navigate('/chat');
  };

  return {
    chatContext,
    conversations,
    isLoadingConversations,
    handleLoadConversation,
    handleDeleteConversation,
    handleNewChat
  };
}
