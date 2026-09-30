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
import { Eye, EyeOff, FileText, Globe, Layout, FolderOpen, Target, Undo2, Redo2, Maximize2, GitCompare, Briefcase, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { translations, TemplateId, Language } from '../types/resume';
import { useActiveSection, useLanguage, useTheme, useTemplate, useProgress } from '../hooks/useResume';
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
  // O primeiro passo deve ser preencher os dados; o preview fica disponível por ação explícita.
  const [showPreview, setShowPreview] = useState(false);

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
  const progress = useProgress();
  const sectionOrder = ['basics', 'experience', 'education', 'certifications', 'projects', 'skills'];
  const sectionLabels: Record<string, string> = {
    basics: t.basics,
    experience: t.experience,
    education: t.education,
    certifications: t.certifications,
    projects: t.projectsSection,
    skills: t.skillsSection,
  };
  const currentSectionIndex = sectionOrder.indexOf(activeSection);

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
            <section className={`mb-5 rounded-2xl border p-5 shadow-sm ${isDark ? 'border-blue-900/60 bg-gradient-to-br from-blue-950/60 to-gray-800' : 'border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`} aria-labelledby="builder-start-title">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Comece por aqui</p>
                  <h1 id="builder-start-title" className={`mt-1 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Vamos criar o seu currículo</h1>
                  <p className={`mt-1 max-w-xl text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Preencha primeiro os seus dados principais. Pode alterar o modelo e abrir o preview quando quiser.</p>
                </div>
                <div className={`hidden shrink-0 rounded-xl px-3 py-2 text-center sm:block ${isDark ? 'bg-gray-800/80' : 'bg-white/80'}`}>
                  <span className={`block text-lg font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{progress}%</span>
                  <span className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>concluído</span>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200/80 dark:bg-gray-700">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {sectionOrder.slice(0, 3).map((section, index) => <span key={section} className={index === 0 ? (isDark ? 'font-semibold text-blue-300' : 'font-semibold text-blue-700') : ''}>{index + 1}. {sectionLabels[section]}</span>)}
                <span>… e revisão final</span>
              </div>
            </section>

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
                  <button
                    onClick={handleTogglePreview}
                    className={`hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${isDark ? 'text-blue-300 hover:bg-gray-700' : 'text-blue-700 hover:bg-blue-50'}`}
                    title={showPreview ? 'Fechar preview' : 'Abrir preview'}
                  >
                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showPreview ? 'Fechar preview' : 'Ver preview'}
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

            {renderForm()}

            <div className={`mt-6 flex items-center justify-between gap-3 border-t pt-5 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button type="button" onClick={() => currentSectionIndex > 0 && setActiveSection(sectionOrder[currentSectionIndex - 1])} disabled={currentSectionIndex <= 0} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${currentSectionIndex > 0 ? (isDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100') : 'cursor-not-allowed text-gray-400'}`}>
                <ArrowLeft className="h-4 w-4" /> Anterior
              </button>
              <span className={`text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Etapa {Math.max(currentSectionIndex + 1, 1)} de {sectionOrder.length}</span>
              <button type="button" onClick={() => currentSectionIndex < sectionOrder.length - 1 && setActiveSection(sectionOrder[currentSectionIndex + 1])} disabled={currentSectionIndex >= sectionOrder.length - 1} className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors ${currentSectionIndex < sectionOrder.length - 1 ? 'hover:bg-blue-700' : 'cursor-not-allowed opacity-50'}`}>
                Próximo <ArrowRight className="h-4 w-4" />
              </button>
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
