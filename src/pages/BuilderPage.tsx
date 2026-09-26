import { useState } from 'react';
import { Sidebar } from '../components/builder/Sidebar';
import { Preview } from '../components/builder/Preview';
import { BasicsForm } from '../components/builder/forms/BasicsForm';
import { ExperienceForm } from '../components/builder/forms/ExperienceForm';
import { EducationForm } from '../components/builder/forms/EducationForm';
import { SkillsForm } from '../components/builder/forms/SkillsForm';
import { DownloadModal } from '../components/ads/DownloadModal';
import { useResumeStore } from '../lib/store';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export function BuilderPage() {
  const activeSection = useResumeStore((state) => state.activeSection);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const renderForm = () => {
    switch (activeSection) {
      case 'basics':
        return <BasicsForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      default:
        return <BasicsForm />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top bar for mobile */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-gray-900">CV Builder</span>
        </Link>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? 'Ocultar Preview' : 'Ver Preview'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile, shown via top bar */}
        <div className="hidden lg:block">
          <Sidebar onDownload={() => setShowDownloadModal(true)} />
        </div>

        {/* Mobile sidebar - horizontal tabs */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 px-2 py-2 safe-area-bottom">
          <div className="flex items-center justify-around gap-1">
            {[
              { id: 'basics', label: 'Dados', icon: 'user' },
              { id: 'experience', label: 'Exp.', icon: 'briefcase' },
              { id: 'education', label: 'Edu.', icon: 'graduation' },
              { id: 'skills', label: 'Skills', icon: 'award' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => useResumeStore.getState().setActiveSection(tab.id)}
                className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeSection === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex-1 px-2 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              {showPreview ? 'Form' : 'Preview'}
            </button>
            <button
              onClick={() => setShowDownloadModal(true)}
              className="flex-1 px-2 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium"
            >
              PDF
            </button>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="max-w-2xl mx-auto">
            {/* Ad banner in form */}
            <div className="mb-6 bg-gray-100 border border-dashed border-gray-300 rounded-lg h-[60px] flex items-center justify-center">
              <span className="text-xs text-gray-400">Espaço Publicitário</span>
            </div>

            {renderForm()}

            {/* Ad banner in form */}
            <div className="mt-6 bg-gray-100 border border-dashed border-gray-300 rounded-lg h-[60px] flex items-center justify-center">
              <span className="text-xs text-gray-400">Espaço Publicitário</span>
            </div>
          </div>
        </div>

        {/* Preview Panel - Desktop */}
        {showPreview && (
          <div className="hidden lg:block w-[600px] border-l border-gray-200 overflow-y-auto bg-gray-100 p-6">
            <div className="sticky top-0">
              <Preview />
            </div>
          </div>
        )}

        {/* Preview Panel - Mobile (overlay) */}
        {showPreview && (
          <div className="lg:hidden fixed inset-0 z-20 bg-gray-100 overflow-y-auto p-4 pb-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Preview do Currículo</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-sm text-blue-600 font-medium"
              >
                Voltar ao Editor
              </button>
            </div>
            <Preview />
          </div>
        )}
      </div>

      {/* Download Modal */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </div>
  );
}
