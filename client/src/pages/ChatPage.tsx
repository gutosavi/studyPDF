import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../app/components/ui/Header';
import SideBar from '../app/components/SideBar';
import ChatArea from '../app/components/ChatArea';
import MessageInput from '../app/components/MessageInput';
import QuickActions from '../app/components/QuickActions';
import { useChat } from '../hooks/useChat';

const ChatPage = () => {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const location = useLocation();
  const document = location.state?.document;

  const { messages, isProcessing, handleSendMessage, handleQuickAction } =
    useChat();

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

        <QuickActions onAction={handleQuickAction} />

        <MessageInput onSend={handleSendMessage} disabled={isProcessing} />
      </div>
    </section>
  );
};

export default ChatPage;
