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

      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
        }),
      });

      if (!response.ok) throw new Error(`Erro: ${response.status}`);

      const result = await response.json();
      addAssistantMessage(result.reply);
    } catch (error) {
      console.error('Erro no chat', error);
    } finally {
      setIsProcessing(false);
    }
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
