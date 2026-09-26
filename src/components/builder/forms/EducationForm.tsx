import { GraduationCap, Plus, Trash2, Building2, Calendar, BookOpen, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { translations } from '../../../types/resume';

export function EducationForm() {
  const education = useResumeStore((state) => state.resumeData.education);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const reorderEducation = useResumeStore((state) => state.reorderEducation);
  const language = useResumeStore((state) => state.language);
  const theme = useResumeStore((state) => state.theme);

  const t = translations[language];
  const isDark = theme === 'dark';

  const inputClass = `w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
  }`;
  const labelClass = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.academicEducation}</h2>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t.add}
        </button>
      </div>

      {education.length === 0 && (
        <div className={`text-center py-12 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
          <GraduationCap className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Nenhuma formação adicionada</p>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Clique em "Adicionar" para começar</p>
        </div>
      )}

      {education.map((edu, index) => (
        <div
          key={edu.id}
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
                onClick={() => index > 0 && reorderEducation(index, index - 1)}
                disabled={index === 0}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} disabled:opacity-30`}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => index < education.length - 1 && reorderEducation(index, index + 1)}
                disabled={index === education.length - 1}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} disabled:opacity-30`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>{t.institution}</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  className={inputClass}
                  placeholder="Universidade / Instituição"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.degree}</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className={inputClass}
                  placeholder="Bacharelado, Mestrado, etc."
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.field}</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  className={inputClass}
                  placeholder="Ciência da Computação"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.startDate}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
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
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  type="month"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
