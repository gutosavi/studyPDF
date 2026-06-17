import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../app/components/ui/Header';

const ChatPage = () => {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const location = useLocation();
  const document = location.state?.document;

  return (
    <section>
      <Header onClick={() => setShowSideBar(true)} />
    </section>
  );
};

export default ChatPage;
