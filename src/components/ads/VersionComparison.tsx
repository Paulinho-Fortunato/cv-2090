import { useState } from 'react';
import { X, ArrowLeftRight, Check } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { useResumeStore } from '../../lib/store';

interface VersionComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  versions: ResumeData[];
}

function DiffField({ label, oldValue, newValue }: { label: string; oldValue: string; newValue: string }) {
  if (oldValue === newValue) return null;
  
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="text-xs text-red-600 font-medium mb-1">Antes</div>
          <div className="text-sm text-gray-700">{oldValue || '(vazio)'}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-xs text-green-600 font-medium mb-1">Depois</div>
          <div className="text-sm text-gray-700">{newValue || '(vazio)'}</div>
        </div>
      </div>
    </div>
  );
}

export function VersionComparison({ isOpen, onClose, versions }: VersionComparisonProps) {
  const [selectedVersion, setSelectedVersion] = useState(0);
  const currentData = useResumeStore((state) => state.resumeData);
  const setResumeData = useResumeStore((state) => state.setResumeData);

  if (!isOpen || versions.length < 2) return null;

  const oldVersion = versions[selectedVersion];
  const newVersion = selectedVersion < versions.length - 1 ? versions[selectedVersion + 1] : currentData;

  const handleApply = () => {
    setResumeData(oldVersion);
    onClose();
  };

  const calculateChanges = () => {
    let changes = 0;
    
    // Compare basics
    const basicsKeys = Object.keys(oldVersion.basics) as (keyof typeof oldVersion.basics)[];
    basicsKeys.forEach(key => {
      const oldVal = oldVersion.basics[key];
      const newVal = newVersion.basics[key];
      if (typeof oldVal === 'string' && typeof newVal === 'string' && oldVal !== newVal) {
        changes++;
      } else if (Array.isArray(oldVal) && Array.isArray(newVal)) {
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) changes++;
      }
    });

    // Compare arrays
    if (oldVersion.experiences.length !== newVersion.experiences.length) changes++;
    if (oldVersion.education.length !== newVersion.education.length) changes++;
    if (oldVersion.certifications.length !== newVersion.certifications.length) changes++;
    if (oldVersion.projects.length !== newVersion.projects.length) changes++;
    if (oldVersion.skills.length !== newVersion.skills.length) changes++;

    return changes;
  };

  const changesCount = calculateChanges();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Comparar Versões</h3>
              <p className="text-sm text-gray-500">{changesCount} alterações detectadas</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Version Selector */}
        <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Versão base:</label>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              {versions.map((version, index) => (
                <option key={index} value={index}>
                  Versão {index + 1} - {new Date(version.basics.fullName ? Date.now() : 0).toLocaleDateString('pt-BR')}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">comparando com versão atual</span>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Basics Comparison */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Dados Pessoais</h4>
              <DiffField label="Nome Completo" oldValue={oldVersion.basics.fullName} newValue={newVersion.basics.fullName} />
              <DiffField label="Cargo" oldValue={oldVersion.basics.headline} newValue={newVersion.basics.headline} />
              <DiffField label="Email" oldValue={oldVersion.basics.email} newValue={newVersion.basics.email} />
              <DiffField label="Telefone" oldValue={oldVersion.basics.phone} newValue={newVersion.basics.phone} />
              <DiffField label="Localização" oldValue={oldVersion.basics.location} newValue={newVersion.basics.location} />
              <DiffField label="Resumo" oldValue={oldVersion.basics.summary} newValue={newVersion.basics.summary} />
            </div>

            {/* Stats Comparison */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-xs text-blue-600 font-medium mb-1">Experiências</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{oldVersion.experiences.length}</span>
                  <span className="text-sm text-gray-500">→ {newVersion.experiences.length}</span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-xs text-green-600 font-medium mb-1">Educação</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{oldVersion.education.length}</span>
                  <span className="text-sm text-gray-500">→ {newVersion.education.length}</span>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-xs text-purple-600 font-medium mb-1">Certificações</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{oldVersion.certifications.length}</span>
                  <span className="text-sm text-gray-500">→ {newVersion.certifications.length}</span>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-xs text-orange-600 font-medium mb-1">Projetos</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{oldVersion.projects.length}</span>
                  <span className="text-sm text-gray-500">→ {newVersion.projects.length}</span>
                </div>
              </div>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="text-xs text-pink-600 font-medium mb-1">Habilidades</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{oldVersion.skills.length}</span>
                  <span className="text-sm text-gray-500">→ {newVersion.skills.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            Aplicar Versão Antiga
          </button>
        </div>
      </div>
    </div>
  );
}
