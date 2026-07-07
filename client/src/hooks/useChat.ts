import React from 'react';
import { apiService } from '../services/api';
import { useChatContext } from '../context/ChatContext';

export const useChat = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { addUserMessage, addAssistantMessage, updateMessage, displayError } =
    useChatContext();

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
      displayError(null);
    } catch (error) {
      console.error('Erro no chat', error);
      displayError(
        error instanceof Error ? error.message : 'Erro desconhecido',
      );
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
    isProcessing,
    handleSendMessage,
    handleQuickAction,
  };
};
