import React from 'react';
import type { Message } from '../types/types';
import { apiService } from '../services/api';

export const useChat = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addAssistantMessage = (content: string, isLoading: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
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

  const handleSendMessage = async (content: string) => {
    try {
      addUserMessage(content);
      setIsProcessing(true);
      const loadingMessageId = addAssistantMessage('', true);

      const result = await apiService.sendMessage(content);

      updateMessage(loadingMessageId, {
        content: result.reply,
        isLoading: false,
      });
    } catch (error) {
      console.error('Erro no chat', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    isProcessing,
    handleSendMessage,
  };
};
