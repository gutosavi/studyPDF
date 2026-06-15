import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UploadArea from './app/components/UploadArea';
import ChatArea from './app/components/ChatArea';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadArea />} />
          <Route path="/chat" element={<ChatArea />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
