import { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { translations } from '../../../types/resume';

export function SkillsForm() {
  const { skills, addSkill, removeSkill, language, theme } = useResumeStore((state) => ({
    skills: state.resumeData.skills,
    addSkill: state.addSkill,
    removeSkill: state.removeSkill,
    language: state.language,
    theme: state.theme,
  }));

  const [newSkill, setNewSkill] = useState('');
  const t = translations[language];
  const isDark = theme === 'dark';

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      addSkill(trimmed);
      setNewSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Suggested skills based on common tech
  const suggestions = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS', 'Figma', 'Photoshop', 'Excel'];
  const availableSuggestions = suggestions.filter((s) => !skills.includes(s));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-5 h-5 text-blue-600" />
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.skillsLabel}</h2>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {t.add} {t.skillsLabel.toLowerCase()}
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
              }`}
              placeholder="Ex: JavaScript, Liderança, Photoshop..."
            />
          </div>
          <button
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            {t.add}
          </button>
        </div>
      </div>

      {/* Suggestions */}
      {availableSuggestions.length > 0 && skills.length < 5 && (
        <div>
          <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sugestões populares:</p>
          <div className="flex flex-wrap gap-1.5">
            {availableSuggestions.slice(0, 8).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSkill(suggestion)}
                className={`px-2 py-1 rounded text-xs border transition-colors ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 ? (
        <div className={`text-center py-12 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
          <Award className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Nenhuma habilidade adicionada</p>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Digite uma habilidade e clique em "Adicionar"
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill: string, index: number) => (
            <div
              key={index}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border group transition-colors ${
                isDark
                  ? 'bg-blue-900/30 text-blue-300 border-blue-800'
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <span className="text-sm font-medium">{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className={`w-4 h-4 flex items-center justify-center rounded-full transition-colors ${
                  isDark ? 'hover:bg-blue-800' : 'hover:bg-blue-200'
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
