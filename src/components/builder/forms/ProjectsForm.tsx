import { useCallback } from 'react';
import { FolderKanban, Plus, Trash2, GripVertical, ChevronUp, ChevronDown, ExternalLink, Code } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { translations } from '../../../types/resume';
import { useResumeProjects, useLanguage, useTheme } from '../../../hooks/useResume';

export function ProjectsForm() {
  const projects = useResumeProjects();
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);
  const reorderProjects = useResumeStore((state) => state.reorderProjects);
  const language = useLanguage();
  const theme = useTheme();

  const t = translations[language];
  const isDark = theme === 'dark';

  const inputClass = `w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
  }`;
  const labelClass = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  const handleMoveUp = useCallback((index: number) => {
    if (index > 0) reorderProjects(index, index - 1);
  }, [reorderProjects]);

  const handleMoveDown = useCallback((index: number) => {
    if (index < projects.length - 1) reorderProjects(index, index + 1);
  }, [reorderProjects, projects.length]);

  return (
    <div className="space-y-6" data-tour="projects-form">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FolderKanban className="w-5 h-5 text-blue-600" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.projectsLabel}</h2>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t.add}
        </button>
      </div>

      {projects.length === 0 && (
        <div className={`text-center py-12 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
          <FolderKanban className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Nenhum projeto adicionado</p>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Adicione projetos pessoais, open source ou profissionais
          </p>
        </div>
      )}

      {projects.map((proj, index) => (
        <div
          key={proj.id}
          className={`border rounded-lg p-4 space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                #{index + 1}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} disabled:opacity-30`}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === projects.length - 1}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} disabled:opacity-30`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeProject(proj.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.projectName}</label>
              <div className="relative">
                <FolderKanban className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                  className={inputClass}
                  placeholder="Nome do projeto"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.projectUrl}</label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={proj.url}
                  onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>{t.technologies}</label>
              <div className="relative">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                  className={inputClass}
                  placeholder="React, TypeScript, Node.js..."
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>{t.description}</label>
              <textarea
                value={proj.description}
                onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                rows={3}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
                placeholder="Descreva o projeto e seu papel nele..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
