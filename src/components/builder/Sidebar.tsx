import { User, Briefcase, GraduationCap, Award, Download, Trash2, FileJson, Upload, FolderKanban } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { useState } from 'react';
import { translations } from '../../types/resume';

interface SidebarProps {
  onDownload: () => void;
}

export function Sidebar({ onDownload }: SidebarProps) {
  const activeSection = useResumeStore((state) => state.activeSection);
  const setActiveSection = useResumeStore((state) => state.setActiveSection);
  const resetAll = useResumeStore((state) => state.resetAll);
  const resumeData = useResumeStore((state) => state.resumeData);
  const importData = useResumeStore((state) => state.importData);
  const theme = useResumeStore((state) => state.theme);
  const setTheme = useResumeStore((state) => state.setTheme);
  const language = useResumeStore((state) => state.language);

  const t = translations[language];
  const [showConfirm, setShowConfirm] = useState(false);

  const sections = [
    { id: 'basics', label: t.basics, icon: User },
    { id: 'experience', label: t.experience, icon: Briefcase },
    { id: 'education', label: t.education, icon: GraduationCap },
    { id: 'projects', label: t.projectsSection, icon: FolderKanban },
    { id: 'skills', label: t.skillsSection, icon: Award },
  ];

  // Progress calculation
  const calculateProgress = () => {
    let total = 0;
    let filled = 0;
    const { basics, experiences, education, projects, skills } = resumeData;

    const basicsFields = [basics.fullName, basics.headline, basics.email, basics.phone, basics.location, basics.summary];
    total += basicsFields.length;
    filled += basicsFields.filter((f) => f.trim() !== '').length;

    total += 1;
    if (experiences.length > 0 && experiences.some((e) => e.company && e.position)) filled += 1;

    total += 1;
    if (education.length > 0 && education.some((e) => e.institution && e.degree)) filled += 1;

    total += 1;
    if (projects.length > 0 && projects.some((p) => p.name)) filled += 1;

    total += 1;
    if (skills.length >= 3) filled += 1;

    return Math.round((filled / total) * 100);
  };

  const progress = calculateProgress();

  const handleExport = () => {
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curriculo.json';
    a.click();
    URL.revokeObjectURL(url);
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

  const isDark = theme === 'dark';

  return (
    <div className={`w-64 border-r flex flex-col h-full ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h1 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <FileJson className="w-5 h-5 text-blue-600" />
          CV Builder
        </h1>
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.progress}: {progress}%
        </p>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
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
                  ? isDark
                    ? 'bg-blue-900/30 text-blue-400 border border-blue-800'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                  : isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </nav>

      <div className={`p-3 border-t space-y-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          {t.downloadPdf}
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className={`flex-1 flex items-center justify-center gap-1.5 border py-2 px-3 rounded-lg text-xs font-medium ${
              isDark
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            {t.export}
          </button>
          <label className={`flex-1 flex items-center justify-center gap-1.5 border py-2 px-3 rounded-lg text-xs font-medium cursor-pointer ${
            isDark
              ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            <Upload className="w-3.5 h-3.5" />
            {t.import}
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm ${
            isDark
              ? 'text-gray-300 hover:bg-gray-800'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {isDark ? t.lightMode : t.darkMode}
        </button>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            {t.clearAll}
          </button>
        ) : (
          <div className={`border rounded-lg p-3 ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-xs mb-2 text-center ${isDark ? 'text-red-300' : 'text-red-700'}`}>
              Tem certeza?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { resetAll(); setShowConfirm(false); }}
                className="flex-1 bg-red-600 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-red-700"
              >
                {t.confirm}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className={`flex-1 border py-1.5 px-3 rounded text-xs font-medium ${
                  isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'
                }`}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
