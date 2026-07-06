import React from 'react';
import type { Message } from '../types/types';
import { ChatContext } from './ChatContext';

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const clearChat = () => {
    setMessages([]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    return newMessage.id;
  };

  const addAssistantMessage = (content: string, isLoading: boolean) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      isLoading,
    };

    setMessages((prev) => [...prev, newMessage]);
    return newMessage.id;
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)),
    );
  };

  return (
    <ChatContext
      value={{
        messages,
        error,
        setError,
        clearChat,
        addUserMessage,
        addAssistantMessage,
        updateMessage,
      }}
    >
      {children}
    </ChatContext>
  );
};
