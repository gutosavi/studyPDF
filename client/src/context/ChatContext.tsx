import React from 'react';
import type { Message } from '../types/types';

interface ChatContextType {
  messages: Message[];
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  clearChat: () => void;
  addUserMessage: (content: string) => string;
  addAssistantMessage: (content: string, isLoading: boolean) => string;
  updateMessage: (id: string, updates: Partial<Message>) => void;
}

export const ChatContext = React.createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('Erro ao usar o ChatProvider');
  }
  return context;
};
