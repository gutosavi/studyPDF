import React from 'react';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const location = useLocation();
  const document = location.state?.document;

  return <div>{document?.name}</div>;
};

export default ChatPage;
