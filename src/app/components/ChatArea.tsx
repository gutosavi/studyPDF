import { Bot } from 'lucide-react';
import React from 'react';

const ChatArea = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
          <Bot className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Comece a conversar com seu PDF
        </h3>
        <p className="text-sm text-gray-500">
          Faça perguntas sobre o conteúdo do documento ou use os botões de ação
          rápida abaixo
        </p>
      </div>
    </div>
  );
};

export default ChatArea;
