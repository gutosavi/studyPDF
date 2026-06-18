import { Calendar, FileText, FileType, X } from 'lucide-react';

interface SideBarProps {
  fileName: string;
  fileSize: string;
  uploadDate: string;
  countPage: number;
  isMobile?: boolean;
  onClose?: () => void;
}

const SideBar = ({
  fileName,
  fileSize,
  uploadDate,
  countPage,
  isMobile,
  onClose,
}: SideBarProps) => {
  return (
    <aside
      className={`
      ${isMobile ? 'fixed inset-0 z-50 bg-white' : 'w-80 border-r border-gray-200'}
      bg-white flex flex-col
    `}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2>Documento</h2>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h5 text-gray-500" />
            </button>
          )}
        </div>

        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {fileName}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{fileSize}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Informações
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Data de upload</p>
                <p className="text-sm text-gray-900">{uploadDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileType className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Páginas</p>
                <p className="text-sm text-gray-900">{countPage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <button className="w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          Remover documento
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
