import React from 'react';
import extractPdfData from '../features/pdf/extractPdfData';
import { apiService } from '../services/api';

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

export const useUploadFile = () => {
  const [document, setDocument] = React.useState<DocumentInfo | null>(null);

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

  const sendDocumentToServer = async (document: DocumentInfo | null) => {
    if (!document) return;

    const documentText = document.pageContents.map((p) => p.text).join('\n');

    try {
      const response = await apiService.uploadPDF(document.name, documentText);

      return response;
    } catch (error) {
      console.error('Erro no upload', error);
    }
  };

  return {
    document,
    handleFileUpload,
    sendDocumentToServer,
  };
};
