
import React, { useRef, useEffect, useState, useCallback } from 'react';
import ChatMessage, { Message } from './ChatMessage';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatMessagesProps {
  messages: Message[];
  onMessageFeedback: (messageId: string, type: 'positive' | 'negative') => void;
  onSelectSuggestedQuestion?: (question: string) => void;
  isLoading?: boolean;
}

const MESSAGES_PER_BATCH = 10;

const ChatMessages: React.FC<ChatMessagesProps> = React.memo(({ 
  messages, 
  onMessageFeedback,
  onSelectSuggestedQuestion,
  isLoading = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  
  // Initialize with the most recent messages
  useEffect(() => {
    if (messages.length > 0) {
      // Always show most recent messages when messages change
      const messagesToShow = messages.length <= MESSAGES_PER_BATCH 
        ? messages 
        : messages.slice(messages.length - MESSAGES_PER_BATCH);
      
      setVisibleMessages(messagesToShow);
      setHasScrolledUp(false);
    } else {
      setVisibleMessages([]);
    }
  }, [messages]);
  
  // Scroll to bottom when new messages arrive, but not when loading older messages
  useEffect(() => {
    if (!hasScrolledUp) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages, hasScrolledUp]);
  
  // Load more messages when scrolling to top
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const threshold = 100; // px from top
    
    // Detect scroll up
    if (scrollHeight - scrollTop - clientHeight > 200) {
      setHasScrolledUp(true);
    }
    
    // If near bottom, mark as not scrolled up
    if (scrollHeight - scrollTop - clientHeight < 50) {
      setHasScrolledUp(false);
    }
    
    if (scrollTop < threshold && visibleMessages.length < messages.length && !isLoadingMore) {
      loadMoreMessages();
    }
  }, [messages, visibleMessages, isLoadingMore]);
  
  const loadMoreMessages = async () => {
    if (visibleMessages.length >= messages.length) return;
    
    setIsLoadingMore(true);
    
    // Simulate a short delay to prevent UI jank
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const currentCount = visibleMessages.length;
    const additionalMessages = messages.slice(
      Math.max(0, messages.length - currentCount - MESSAGES_PER_BATCH),
      messages.length - currentCount
    );
    
    setVisibleMessages(prev => [...additionalMessages, ...prev]);
    setIsLoadingMore(false);
  };
  
  // Filter out any system messages
  const displayMessages = visibleMessages.filter(message => message.role !== 'system');
  
  if (isLoading && messages.length === 0) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <span className="ml-2 text-muted-foreground">Đang tải cuộc trò chuyện...</span>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="py-4 px-4 h-full overflow-y-auto" 
      onScroll={handleScroll}
    >
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <span className="ml-2 text-sm text-muted-foreground">Đang tải tin nhắn cũ hơn...</span>
        </div>
      )}
      
      {displayMessages.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>Chưa có tin nhắn nào. Hãy bắt đầu trò chuyện!</p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {displayMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2, 
                // Use a faster animation if we have more than 10 messages
                delay: displayMessages.length > 10 ? 0 : 0.05 
              }}
            >
              <ChatMessage 
                message={message} 
                onFeedback={onMessageFeedback}
                onSelectSuggestedQuestion={onSelectSuggestedQuestion}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
