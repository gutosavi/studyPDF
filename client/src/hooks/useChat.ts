import React from 'react';
import type { Message } from '../types/types';
import { apiService } from '../services/api';
import { useChatContext } from '../context/ChatContext';

export const useChat = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { messages, setMessages, error, setError } = useChatContext();

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

  const handleSendMessage = async (content: string) => {
    try {
      addUserMessage(content);
      setIsProcessing(true);
      const loadingMessageId = addAssistantMessage('', true);

      // mudar para apiService.sendMessage(content);
      const result = await apiService.mockAPI();

      updateMessage(loadingMessageId, {
        content: result.reply,
        isLoading: false,
      });
      setError(null);
    } catch (error) {
      console.error('Erro no chat', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      summarize: 'Por favor, crie um resumo completo do documento.',
      flashcards: 'Gere flashcards com os principais conceitos do documento.',
      quiz: 'Crie um quiz de perguntas sobre o conteúdo do documento.',
    };

    const message = actionMessages[action];
    if (message) {
      handleSendMessage(message);
    }
  };

  return {
    messages,
    isProcessing,
    error,
    handleSendMessage,
    handleQuickAction,
  };
};
