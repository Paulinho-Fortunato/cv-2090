import { User, Briefcase, GraduationCap, Award, Download, Trash2, FileJson, Upload } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { useState } from 'react';

interface SidebarProps {
  onDownload: () => void;
}

export function Sidebar({ onDownload }: SidebarProps) {
  const { activeSection, setActiveSection, resetAll, data, importData } = useResumeStore(
    (state) => ({
      activeSection: state.activeSection,
      setActiveSection: state.setActiveSection,
      resetAll: state.resetAll,
      data: state.data,
      importData: state.importData,
    })
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const sections = [
    { id: 'basics', label: 'Dados Pessoais', icon: User },
    { id: 'experience', label: 'Experiência', icon: Briefcase },
    { id: 'education', label: 'Educação', icon: GraduationCap },
    { id: 'skills', label: 'Habilidades', icon: Award },
  ];

  const handleExport = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curriculo.json';
    a.click();
    URL.revokeObjectURL(url);
    setShowExport(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          importData(imported);
        } catch {
          alert('Arquivo JSON inválido');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileJson className="w-5 h-5 text-blue-600" />
          CV Builder
        </h1>
        <p className="text-xs text-gray-500 mt-1">Construtor de Currículo</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-200 space-y-2">
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          Baixar PDF
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium"
          >
            <FileJson className="w-3.5 h-3.5" />
            Exportar
          </button>
          <label className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            Importar
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Limpar Tudo
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs text-red-700 mb-2 text-center">Tem certeza? Todos os dados serão perdidos.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetAll();
                  setShowConfirm(false);
                }}
                className="flex-1 bg-red-600 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-red-700"
              >
                Sim, limpar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-1.5 px-3 rounded text-xs font-medium hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
