
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getSystemPromptForContext, getWelcomeMessageForContext } from '@/utils/chatUtils';
import { Message } from '@/types/chatTypes';

interface UseChatInitializerProps {
  initialContext: string | null;
  initialMessages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function useChatInitializer({ 
  initialContext, 
  initialMessages, 
  setMessages 
}: UseChatInitializerProps) {
  // Initialize with system message based on context if no initial messages
  useEffect(() => {
    if (initialContext && initialMessages.length === 0) {
      const systemPrompt = getSystemPromptForContext(initialContext);
      setMessages([
        {
          id: uuidv4(),
          role: 'system',
          content: systemPrompt,
          timestamp: new Date(),
        },
        {
          id: uuidv4(),
          role: 'assistant',
          content: getWelcomeMessageForContext(initialContext),
          timestamp: new Date(),
        }
      ]);
    }
  }, [initialContext, initialMessages, setMessages]);
}
