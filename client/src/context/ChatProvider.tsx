import React from 'react';
import { ChatContext } from './ChatContext';

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  return (
    <ChatContext value={{ message, setMessage, error, setError }}>
      {children}
    </ChatContext>
  );
};
