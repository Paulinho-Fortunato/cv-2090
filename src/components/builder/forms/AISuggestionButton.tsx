import { useState } from 'react';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { generateAISuggestion } from '../../../lib/ai';

interface AISuggestionButtonProps {
  onApply: (suggestion: string) => void;
  context: string;
  promptType: 'summary' | 'experience' | 'skills' | 'improvement';
  label?: string;
}

export function AISuggestionButton({
  onApply,
  context,
  promptType,
  label = 'Sugerir com IA',
}: AISuggestionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');

    try {
      const prompts = {
        summary: `Gere um resumo profissional conciso e impactante para um currículo. Contexto: ${context}`,
        experience: `Descreva uma experiência profissional de forma clara e orientada a resultados. Contexto: ${context}`,
        skills: `Liste habilidades técnicas relevantes para o contexto fornecido. Contexto: ${context}`,
        improvement: `Sugira melhorias específicas para otimizar este conteúdo para sistemas ATS. Contexto: ${context}`,
      };

      const result = await generateAISuggestion(prompts[promptType]);
      setSuggestion(result);
    } catch (err) {
      setError('Erro ao gerar sugestão. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onApply(suggestion);
    setIsOpen(false);
    setSuggestion('');
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        {label}
      </button>
    );
  }

  return (
    <div className="mt-2 p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-900">Sugestão da IA</span>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            setSuggestion('');
            setError('');
          }}
          className="text-purple-600 hover:text-purple-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-4">
          <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
          <span className="text-sm text-purple-700">Gerando sugestão...</span>
        </div>
      ) : error ? (
        <div className="text-sm text-red-600 py-2">{error}</div>
      ) : suggestion ? (
        <div className="space-y-3">
          <div className="p-3 bg-white rounded border border-purple-100">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{suggestion}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleApply}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Aplicar Sugestão
            </button>
            <button
              onClick={handleGenerate}
              className="px-3 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Gerar Outra
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleGenerate}
          className="w-full px-3 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
        >
          Gerar Sugestão
        </button>
      )}
    </div>
  );
}
