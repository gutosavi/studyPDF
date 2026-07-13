import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const ChatPage = React.lazy(() => import('../pages/ChatPage'));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <React.Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
