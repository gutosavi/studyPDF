import { FileText, Upload } from 'lucide-react';
import React from 'react';

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
}

const UploadArea = ({ onFileUpload }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }; // disparado quando o elemento está sendo arrastado sobre o alvo.

  const handleDragLeave = () => {
    setIsDragging(false);
  }; // disparado quando o elemento sai da área  do alvo

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((file) => file.type === 'application/pdf');

    if (pdfFile) {
      onFileUpload(pdfFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileUpload(file);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full max-w-2xl p-12 rounded-2xl border-2 border-dashed
          transition-all duration-200 cursor-pointer
          ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <input
          type="file"
          name="inputFile"
          id="inputFile"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={`p-4 rounded-full transition-colors ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}
          >
            {isDragging ? (
              <FileText className="w-10 h-10 text-blue-500" />
            ) : (
              <Upload className="w-10 h-10 text-gray-400" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {isDragging ? 'Solte seu PDF aqui' : 'Upload de PDF'}
            </h3>
            <p className="text-sm text-gray-500">
              Arraste e solte ou clique para selecionar um arquivo PDF
            </p>
          </div>

          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
            Selecionar arquivo
          </button>
        </div>
      </div>
    </main>
  );
};

export default UploadArea;
