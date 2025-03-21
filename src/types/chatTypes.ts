
import { User } from '@supabase/supabase-js';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  pending?: boolean;
  translated?: string;
  feedback?: 'positive' | 'negative';
  isError?: boolean;
  suggestedQuestions?: string[];
}

export interface UseChatStateProps {
  initialContext?: string | null;
  initialMessages?: Message[];
  conversationId?: string | null;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string, imageBase64?: string, customModel?: string) => Promise<void>;
  clear: () => void;
  activeConversationId: string | null;
  setConversation: (id: string | null, newMessages: Message[]) => void;
  model: string;
  setModel: (model: string) => void;
}
