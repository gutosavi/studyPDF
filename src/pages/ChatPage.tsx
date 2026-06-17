import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../app/components/ui/Header';
import SideBar from '../app/components/SideBar';

const ChatPage = () => {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const location = useLocation();
  const document = location.state?.document;

  return (
    <section className="flex h-screen bg-white overflow-hidden">
      <div className="hidden lg:block">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header onClick={() => setShowSideBar(true)} />
      </div>
    </section>
  );
};

export default ChatPage;
