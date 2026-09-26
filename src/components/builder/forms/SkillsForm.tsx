import { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';

export function SkillsForm() {
  const { skills, addSkill, removeSkill } = useResumeStore((state) => ({
    skills: state.data.skills,
    addSkill: state.addSkill,
    removeSkill: state.removeSkill,
  }));

  const [newSkill, setNewSkill] = useState('');

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Habilidades</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adicionar Habilidade
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: JavaScript, Liderança, Photoshop..."
            />
          </div>
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Award className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma habilidade adicionada</p>
          <p className="text-sm text-gray-400 mt-1">
            Digite uma habilidade e clique em "Adicionar"
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 group hover:bg-blue-100 transition-colors"
            >
              <span className="text-sm font-medium">{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors"
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
