import { useState } from 'react';
import { X, Plus, Trash2, Edit2, Copy, Check, FileText } from 'lucide-react';
import { useResumeManager } from '../../lib/resumeManager';
import { useResumeStore } from '../../lib/store';

interface ResumeManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeManagerModal({ isOpen, onClose }: ResumeManagerModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newName, setNewName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const resumes = useResumeManager((state) => state.resumes);
  const currentResumeId = useResumeManager((state) => state.currentResumeId);
  const createResume = useResumeManager((state) => state.createResume);
  const deleteResume = useResumeManager((state) => state.deleteResume);
  const renameResume = useResumeManager((state) => state.renameResume);
  const duplicateResume = useResumeManager((state) => state.duplicateResume);
  const switchResume = useResumeManager((state) => state.switchResume);
  const setResumeData = useResumeStore((state) => state.setResumeData);

  if (!isOpen) return null;

  const handleSwitch = (id: string) => {
    const resume = resumes.find((r) => r.id === id);
    if (resume) {
      switchResume(id);
      setResumeData(resume.data);
      onClose();
    }
  };

  const handleCreate = () => {
    if (newName.trim()) {
      createResume(newName.trim());
      setNewName('');
      setShowCreateForm(false);
    }
  };

  const handleRename = (id: string) => {
    if (editName.trim()) {
      renameResume(id, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  const handleDelete = (id: string) => {
    if (resumes.length === 1) {
      alert('Você precisa ter pelo menos um currículo.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir este currículo?')) {
      deleteResume(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Gerenciar Currículos
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Lista de currículos */}
          <div className="space-y-2">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className={`border rounded-lg p-4 transition-all ${
                  resume.id === currentResumeId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {editingId === resume.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRename(resume.id)}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handleRename(resume.id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditName('');
                          }}
                          className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {resume.name}
                          </h4>
                          {resume.id === currentResumeId && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                              Atual
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Atualizado em {formatDate(resume.updatedAt)}
                        </p>
                      </>
                    )}
                  </div>

                  {editingId !== resume.id && (
                    <div className="flex items-center gap-1">
                      {resume.id !== currentResumeId && (
                        <button
                          onClick={() => handleSwitch(resume.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Abrir"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditingId(resume.id);
                          setEditName(resume.name);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                        title="Renomear"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => duplicateResume(resume.id)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {!resume.isDefault && (
                        <button
                          onClick={() => handleDelete(resume.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formulário de criação */}
          {showCreateForm ? (
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  placeholder="Nome do novo currículo"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  autoFocus
                />
                <button
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewName('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-medium">Criar Novo Currículo</span>
            </button>
          )}

          {/* Informações */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p className="font-medium mb-1">💡 Dicas:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Crie currículos diferentes para diferentes vagas</li>
              <li>Use Ctrl+Z para desfazer e Ctrl+Y para refazer</li>
              <li>Duplique um currículo para criar variações rapidamente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
