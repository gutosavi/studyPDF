import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadArea from '../app/components/UploadArea';
import extractPdfData from '../features/pdf/extractPdfData';

interface DocumentInfo {
  name: string;
  size: string;
  uploadDate: string;
  countPage: number;
  pageContents: {
    pageNumber: number;
    text: string;
  }[];
}

const HomePage = () => {
  const [document, setDocument] = React.useState<DocumentInfo | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const uploadDate = new Date().toLocaleDateString('pt-BR');
    const pdfData = await extractPdfData(file);

    setDocument({
      name: file.name,
      size: `${fileSizeInMB} MB`,
      uploadDate,
      countPage: pdfData.totalPages,
      pageContents: pdfData.pagesData,
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
