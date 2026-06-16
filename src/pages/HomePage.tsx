import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadArea from '../app/components/UploadArea';

interface DocumentInfo {
  name: string;
  size: string;
  uploadDate: string;
}

const HomePage = () => {
  const [document, setDocument] = React.useState<DocumentInfo | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = (file: File) => {
    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const uploadDate = new Date().toLocaleDateString('pt-BR');

    setDocument({
      name: file.name,
      size: `${fileSizeInMB} MB`,
      uploadDate,
    });
  };

  React.useEffect(() => {
    if (document) {
      navigate('/chat', { state: { document } });
      console.log('Documento atualizado', document);
    }
  }, [navigate, document]);

  return <UploadArea onFileUpload={handleFileUpload} />;
};

export default HomePage;
