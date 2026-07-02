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

  const addAssistantMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = async (content: string) => {
    try {
      addUserMessage(content);
      setIsProcessing(true);

      const result = await apiService.sendMessage(content);

      addAssistantMessage(result.reply);
    } catch (error) {
      console.error('Erro no chat', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    isProcessing,
    addAssistantMessage,
    handleSendMessage,
  };
};
