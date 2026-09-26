import { useState, useCallback } from 'react';
import { Sidebar } from '../components/builder/Sidebar';
import { Preview } from '../components/builder/Preview';
import { BasicsForm } from '../components/builder/forms/BasicsForm';
import { ExperienceForm } from '../components/builder/forms/ExperienceForm';
import { EducationForm } from '../components/builder/forms/EducationForm';
import { ProjectsForm } from '../components/builder/forms/ProjectsForm';
import { SkillsForm } from '../components/builder/forms/SkillsForm';
import { DownloadModal } from '../components/ads/DownloadModal';
import { useResumeStore } from '../lib/store';
import { Eye, EyeOff, FileText, Globe, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { translations, TemplateId, Language } from '../types/resume';
import { useActiveSection, useLanguage, useTheme, useTemplate } from '../hooks/useResume';

function BuilderContent() {
  const activeSection = useActiveSection();
  const setActiveSection = useResumeStore((state) => state.setActiveSection);
  const setLanguage = useResumeStore((state) => state.setLanguage);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const language = useLanguage();
  const theme = useTheme();
  const template = useTemplate();
  
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const t = translations[language];
  const isDark = theme === 'dark';

  const handleDownload = useCallback(() => {
    setShowDownloadModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowDownloadModal(false);
  }, []);

  const handleTogglePreview = useCallback(() => {
    setShowPreview((prev) => !prev);
  }, []);

  const renderForm = () => {
    switch (activeSection) {
      case 'basics': return <BasicsForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'projects': return <ProjectsForm />;
      case 'skills': return <SkillsForm />;
      default: return <BasicsForm />;
    }
  };

  const templates: { id: TemplateId; label: string }[] = [
    { id: 'modern', label: 'Moderno' },
    { id: 'executive', label: 'Executivo' },
    { id: 'tech', label: 'Tech/Dev' },
    { id: 'compact', label: 'Compacto' },
    { id: 'creative', label: 'Criativo' },
  ];

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'pt', label: 'Português', flag: 'PT' },
    { id: 'en', label: 'English', flag: 'EN' },
    { id: 'es', label: 'Español', flag: 'ES' },
  ];

  return (
    <div className={`h-screen flex flex-col ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top bar for mobile */}
      <div className={`lg:hidden border-b px-4 py-3 flex items-center justify-between ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <Link to="/" className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>CV Builder</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePreview}
            className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar onDownload={handleDownload} />
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="max-w-2xl mx-auto">
            {/* Toolbar */}
            <div className={`flex items-center justify-between mb-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <Layout className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as TemplateId)}
                  className={`text-sm border rounded px-2 py-1 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                >
                  {templates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>{tpl.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className={`text-sm border rounded px-2 py-1 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.flag} - {lang.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ad banner */}
            <div className={`mb-6 border border-dashed rounded-lg h-[60px] flex items-center justify-center ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-100'}`}>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Espaço Publicitário</span>
            </div>

            {renderForm()}

            {/* Ad banner */}
            <div className={`mt-6 border border-dashed rounded-lg h-[60px] flex items-center justify-center ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-100'}`}>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Espaço Publicitário</span>
            </div>
          </div>
        </div>

        {/* Preview Panel - Desktop */}
        {showPreview && (
          <div className={`hidden lg:block w-[600px] border-l overflow-y-auto p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
            <div className="sticky top-0">
              <Preview />
            </div>
          </div>
        )}

        {/* Preview Panel - Mobile */}
        {showPreview && (
          <div className={`lg:hidden fixed inset-0 z-20 overflow-y-auto p-4 pb-20 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Preview</h3>
              <button
                onClick={handleTogglePreview}
                className="text-sm text-blue-600 font-medium"
              >
                Voltar ao Editor
              </button>
            </div>
            <Preview />
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 border-t z-30 px-2 py-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-around gap-1">
          {[
            { id: 'basics', label: t.basics },
            { id: 'experience', label: t.experience },
            { id: 'education', label: t.education },
            { id: 'projects', label: t.projectsSection },
            { id: 'skills', label: t.skillsSection },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 px-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeSection === tab.id
                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={handleDownload}
            className="flex-1 px-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium"
          >
            PDF
          </button>
        </div>
      </div>

      <DownloadModal isOpen={showDownloadModal} onClose={handleCloseModal} />
    </div>
  );
}

export function BuilderPage() {
  return <BuilderContent />;
}
