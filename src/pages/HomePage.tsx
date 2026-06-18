import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadArea from '../app/components/UploadArea';
import getPdfPageCount from '../features/pdf/getPdfPageCount';

interface DocumentInfo {
  name: string;
  size: string;
  uploadDate: string;
  countPage: number;
}

const HomePage = () => {
  const [document, setDocument] = React.useState<DocumentInfo | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const uploadDate = new Date().toLocaleDateString('pt-BR');
    const countPage = await getPdfPageCount(file);

    setDocument({
      name: file.name,
      size: `${fileSizeInMB} MB`,
      uploadDate,
      countPage: countPage,
    });
  };

  React.useEffect(() => {
    if (document) {
      navigate('/chat', { state: { document } });
    }
  }, [navigate, document]);

  return <UploadArea onFileUpload={handleFileUpload} />;
};

export default HomePage;
