import React from 'react';
import UploadArea from '../app/components/UploadArea';
import { useNavigate } from 'react-router-dom';
import { useUploadFile } from '../hooks/useUploadFile';

const HomePage = () => {
  const navigate = useNavigate();
  const { document, handleFileUpload, sendDocumentToServer } = useUploadFile();

  React.useEffect(() => {
    sendDocumentToServer(document);
  }, [sendDocumentToServer, document]);

  React.useEffect(() => {
    if (document) {
      navigate('/chat', { state: { document } });
    }
  }, [navigate, document]);

  return <UploadArea onFileUpload={handleFileUpload} />;
};

export default HomePage;
