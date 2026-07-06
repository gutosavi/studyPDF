import { AppRoutes } from './routes/AppRoutes';
import './App.css';
import { ChatProvider } from './context/ChatProvider';

function App() {
  return (
    <ChatProvider>
      <AppRoutes />
    </ChatProvider>
  );
}

export default App;
