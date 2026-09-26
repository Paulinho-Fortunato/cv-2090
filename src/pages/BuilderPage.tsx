import { useState, useCallback, useEffect } from 'react';
import { Sidebar } from '../components/builder/Sidebar';
import { AnimatedPreview } from '../components/builder/AnimatedPreview';
import { BasicsForm } from '../components/builder/forms/BasicsForm';
import { ExperienceForm } from '../components/builder/forms/ExperienceForm';
import { EducationForm } from '../components/builder/forms/EducationForm';
import { CertificationsForm } from '../components/builder/forms/CertificationsForm';
import { ProjectsForm } from '../components/builder/forms/ProjectsForm';
import { SkillsForm } from '../components/builder/forms/SkillsForm';
import { DownloadModal } from '../components/ads/DownloadModal';
import { ResumeManagerModal } from '../components/ads/ResumeManagerModal';
import { ATSAnalysisModal } from '../components/ads/ATSAnalysisModal';
import { FullscreenPreview } from '../components/ads/FullscreenPreview';
import { VersionComparison } from '../components/ads/VersionComparison';
import { CoverLetterGenerator } from '../components/ads/CoverLetterGenerator';
import { IndustryTemplates } from '../components/ads/IndustryTemplates';
import { CustomTemplateEditor } from '../components/builder/CustomTemplateEditor';
import { MobileToolbar } from '../components/builder/MobileToolbar';
import { GuidedTour, useGuidedTour } from '../components/ui/GuidedTour';
import { useResumeStore } from '../lib/store';
import { Eye, EyeOff, FileText, Globe, Layout, FolderOpen, Target, Undo2, Redo2, Maximize2, GitCompare, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { translations, TemplateId, Language } from '../types/resume';
import { useActiveSection, useLanguage, useTheme, useTemplate } from '../hooks/useResume';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { useSectionNavigation } from '../hooks/useTouchGestures';

function BuilderContent() {
  const activeSection = useActiveSection();
  const setActiveSection = useResumeStore((state) => state.setActiveSection);
  const setLanguage = useResumeStore((state) => state.setLanguage);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const importData = useResumeStore((state) => state.importData);
  const language = useLanguage();
  const theme = useTheme();
  const template = useTemplate();
  
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showResumeManager, setShowResumeManager] = useState(false);
  const [showATSAnalysis, setShowATSAnalysis] = useState(false);
  const [showFullscreenPreview, setShowFullscreenPreview] = useState(false);
  const [showVersionComparison, setShowVersionComparison] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showIndustryTemplates, setShowIndustryTemplates] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const { canUndo, canRedo, undo, redo } = useUndoRedo();
  const { isActive: isTourActive, completeTour, skipTour, restartTour } = useGuidedTour();
  
  // Navegação por gestos touch entre seções
  useSectionNavigation(
    ['basics', 'experience', 'education', 'certifications', 'projects', 'skills'],
    activeSection,
    setActiveSection
  );
  
  // Version history for comparison
  const [versionHistory, setVersionHistory] = useState<any[]>([]);
  const resumeData = useResumeStore((state) => state.resumeData);
  
  // Save version snapshot every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVersionHistory(prev => {
        const newHistory = [...prev, JSON.parse(JSON.stringify(resumeData))];
        return newHistory.slice(-10); // Keep last 10 versions
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [resumeData]);

  const t = translations[language];
  const isDark = theme === 'dark';

  // Parser de URL para carregar currículos compartilhados
  useEffect(() => {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf('?');
    if (queryIndex !== -1) {
      const queryString = hash.substring(queryIndex + 1);
      const params = new URLSearchParams(queryString);
      const data = params.get('data');
      if (data) {
        try {
          const decoded = JSON.parse(decodeURIComponent(atob(data)));
          importData(decoded);
          // Remove o parâmetro da URL após carregar
          window.history.replaceState(null, '', window.location.pathname + '#/builder');
        } catch (error) {
          console.error('Erro ao carregar currículo compartilhado:', error);
        }
      }
    }
  }, [importData]);

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
    // Se o template for custom, mostrar editor de personalização
    if (template === 'custom') {
      return (
        <div className="space-y-6">
          <CustomTemplateEditor />
          <div className="border-t pt-6">
            <BasicsForm />
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'basics': return <BasicsForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'certifications': return <CertificationsForm />;
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
    { id: 'custom', label: '✨ Personalizado' },
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
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className={`text-xs border rounded px-2 py-1 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>{lang.flag}</option>
            ))}
          </select>
          <button
            onClick={handleTogglePreview}
            className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Header Desktop */}
      <div className={`hidden lg:block border-b px-6 py-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>CV Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className={`text-sm border rounded-lg px-3 py-1.5 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.flag} - {lang.label}</option>
              ))}
            </select>
            <Link 
              to="/" 
              className={`text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              ← Voltar
            </Link>
          </div>
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
            <div className={`mb-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {/* Linha 1: Template + Undo/Redo */}
              <div className="flex items-center justify-between mb-3">
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
                <div className="flex items-center gap-1" data-tour="undo-redo">
                  <button
                    onClick={undo}
                    disabled={!canUndo}
                    className={`p-2 rounded-lg transition-colors ${
                      canUndo
                        ? isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    title="Desfazer (Ctrl+Z)"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={redo}
                    disabled={!canRedo}
                    className={`p-2 rounded-lg transition-colors ${
                      canRedo
                        ? isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    title="Refazer (Ctrl+Y)"
                  >
                    <Redo2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Linha 2: Botões de ferramentas */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setShowResumeManager(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Gerenciar Currículos"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden md:inline">Currículos</span>
                </button>

                <button
                  onClick={() => setShowATSAnalysis(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Análise ATS"
                  data-tour="ats-button"
                >
                  <Target className="w-4 h-4" />
                  <span className="hidden md:inline">ATS</span>
                </button>

                <button
                  onClick={() => setShowFullscreenPreview(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Preview em Tela Cheia"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden md:inline">Tela Cheia</span>
                </button>

                {versionHistory.length > 0 && (
                  <button
                    onClick={() => setShowVersionComparison(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                      isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    title="Comparar Versões"
                  >
                    <GitCompare className="w-4 h-4" />
                    <span className="hidden md:inline">Comparar</span>
                  </button>
                )}

                <button
                  onClick={() => setShowCoverLetter(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Carta de Apresentação"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden md:inline">Carta</span>
                </button>

                <button
                  onClick={() => setShowIndustryTemplates(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Templates por Indústria"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden md:inline">Indústria</span>
                </button>
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
          <div className={`hidden lg:block w-[600px] border-l overflow-y-auto p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`} data-tour="preview">
            <div className="sticky top-0">
              <AnimatedPreview />
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
            <AnimatedPreview />
          </div>
        )}
      </div>

      {/* Mobile Toolbar com Glassmorphism */}
      <MobileToolbar onDownload={handleDownload} />

      <DownloadModal isOpen={showDownloadModal} onClose={handleCloseModal} />
      <ResumeManagerModal 
        isOpen={showResumeManager} 
        onClose={() => setShowResumeManager(false)} 
      />
      <ATSAnalysisModal 
        isOpen={showATSAnalysis} 
        onClose={() => setShowATSAnalysis(false)} 
      />
      <FullscreenPreview 
        isOpen={showFullscreenPreview} 
        onClose={() => setShowFullscreenPreview(false)} 
      />
      <VersionComparison 
        isOpen={showVersionComparison} 
        onClose={() => setShowVersionComparison(false)} 
        versions={versionHistory}
      />
      <CoverLetterGenerator 
        isOpen={showCoverLetter} 
        onClose={() => setShowCoverLetter(false)} 
      />
      <IndustryTemplates 
        isOpen={showIndustryTemplates} 
        onClose={() => setShowIndustryTemplates(false)} 
      />
      <GuidedTour 
        isActive={isTourActive} 
        onComplete={completeTour}
        onSkip={skipTour}
      />
    </div>
  );
}

export function BuilderPage() {
  return <BuilderContent />;
}
