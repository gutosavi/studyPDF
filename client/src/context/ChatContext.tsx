import React from 'react';

interface ChatContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ChatContext = React.createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext deve ser usado com um ChatProvider');
  }
  return context;
};
