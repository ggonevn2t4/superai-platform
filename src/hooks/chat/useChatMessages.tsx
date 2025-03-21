
import { useState } from 'react';
import { Message } from '@/types/chatTypes';

interface UseChatMessagesProps {
  initialContext: string | null;
  initialMessages: Message[];
}

export function useChatMessages({ initialMessages }: UseChatMessagesProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return {
    messages,
    setMessages
  };
}
