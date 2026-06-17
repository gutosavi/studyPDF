import React from 'react';
import { Menu } from 'lucide-react';

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Header = ({ onClick }: ButtonProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <button
          onClick={onClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-900">StudyPDF AI</h1>
          <p className="text-sm text-gray-500 hidden sm:block">
            Converse com seu documento de forma inteligente
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
