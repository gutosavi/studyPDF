import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../app/components/ui/Header';
import SideBar from '../app/components/SideBar';
import ChatArea, { type Message } from '../app/components/ChatArea';
import MessageInput from '../app/components/MessageInput';

const ChatPage = () => {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const location = useLocation();
  const document = location.state?.document;

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
    // conectar com a API
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = (content: string) => {
    addUserMessage(content); // aqui está o conteúdo do input
    setIsProcessing(true);

    // aqui fazer o fetch para localhost:3000/chat
    // document.pageContents contém o arquivo PDF
    // lembrar de transformar em uma string concatenada
    setTimeout(() => {
      const responses = [
        'Com base no documento, posso explicar que...',
        'De acordo com o conteúdo do PDF, a resposta é...',
        'Encontrei essa informação no documento: ...',
        'Deixe me consultar o documento para você. Aqui está o que encontrei...',
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addAssistantMessage(randomResponse); // setar a resposta da API
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <section className="flex h-screen bg-white overflow-hidden">
      <div className="hidden lg:block">
        <SideBar
          fileName={document.name}
          fileSize={document.size}
          uploadDate={document.uploadDate}
          countPage={document.countPage}
        />
      </div>
      {showSideBar && (
        <SideBar
          fileName={document.name}
          fileSize={document.size}
          uploadDate={document.uploadDate}
          countPage={document.countPage}
          onClose={() => setShowSideBar(false)}
          isMobile={true}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onClick={() => setShowSideBar(true)} />

        <ChatArea messages={messages} />

        <MessageInput onSend={handleSendMessage} disabled={isProcessing} />
      </div>
    </section>
  );
};

export default ChatPage;
