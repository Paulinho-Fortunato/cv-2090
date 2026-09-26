import { useCallback } from 'react';
import { Briefcase, Plus, Trash2, Building2, Calendar, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { translations } from '../../../types/resume';
import { useResumeExperiences, useLanguage, useTheme } from '../../../hooks/useResume';

export function ExperienceForm() {
  const experiences = useResumeExperiences();
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const reorderExperiences = useResumeStore((state) => state.reorderExperiences);
  const language = useLanguage();
  const theme = useTheme();

  const t = translations[language];
  const isDark = theme === 'dark';

  const inputClass = `w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
  }`;
  const labelClass = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  const handleMoveUp = useCallback((index: number) => {
    if (index > 0) reorderExperiences(index, index - 1);
  }, [reorderExperiences]);

  const handleMoveDown = useCallback((index: number) => {
    if (index < experiences.length - 1) reorderExperiences(index, index + 1);
  }, [reorderExperiences, experiences.length]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.professionalExperience}</h2>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t.add}
        </button>
      </div>

      {experiences.length === 0 && (
        <div className={`text-center py-12 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
          <Briefcase className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Nenhuma experiência adicionada</p>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Clique em "Adicionar" para começar</p>
        </div>
      )}

      {experiences.map((exp, index) => (
        <div
          key={exp.id}
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
                disabled={index === experiences.length - 1}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} disabled:opacity-30`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t.company}</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  className={inputClass}
                  placeholder="Nome da empresa"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.position}</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  className={inputClass}
                  placeholder="Seu cargo"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.startDate}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  type="month"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.endDate}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  type="month"
                  disabled={exp.current}
                  className={`${inputClass} disabled:opacity-50`}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.current}</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>{t.description}</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                rows={3}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
                placeholder="Descreva suas responsabilidades e conquistas..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
