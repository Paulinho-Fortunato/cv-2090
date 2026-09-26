import { memo } from 'react';
import { User, Briefcase, GraduationCap, Award, FolderKanban, FileText, Download, Menu } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { translations } from '../../types/resume';
import { useActiveSection, useLanguage, useTheme } from '../../hooks/useResume';

interface MobileToolbarProps {
  onDownload: () => void;
}

export const MobileToolbar = memo(function MobileToolbar({ onDownload }: MobileToolbarProps) {
  const activeSection = useActiveSection();
  const setActiveSection = useResumeStore((state) => state.setActiveSection);
  const language = useLanguage();
  const theme = useTheme();
  const t = translations[language];
  const isDark = theme === 'dark';

  const sections = [
    { id: 'basics', label: t.basics, icon: User, shortLabel: 'Dados' },
    { id: 'experience', label: t.experience, icon: Briefcase, shortLabel: 'Exp' },
    { id: 'education', label: t.education, icon: GraduationCap, shortLabel: 'Edu' },
    { id: 'certifications', label: t.certifications, icon: Award, shortLabel: 'Cert' },
    { id: 'projects', label: t.projectsSection, icon: FolderKanban, shortLabel: 'Proj' },
    { id: 'skills', label: t.skillsSection, icon: FileText, shortLabel: 'Skills' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
      {/* Glassmorphism Background */}
      <div className={`backdrop-blur-xl border-t ${
        isDark 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        {/* Main Navigation */}
        <div className="flex items-center justify-around px-2 py-2 gap-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? 'bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/20'
                      : 'bg-blue-500/10 text-blue-600 shadow-lg shadow-blue-500/20'
                    : isDark
                    ? 'text-gray-400 hover:bg-gray-800/50'
                    : 'text-gray-600 hover:bg-gray-100/50'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-medium">{section.shortLabel}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Download Button - Floating */}
        <div className="px-4 pb-3 pt-1">
          <button
            onClick={onDownload}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              isDark
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Baixar PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
});
