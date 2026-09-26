import { useState } from 'react';
import { X, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { analyzeATSKeywords } from '../../lib/atsAnalysis';
import { useResumeStore } from '../../lib/store';

interface ATSAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ATSAnalysisModal({ isOpen, onClose }: ATSAnalysisModalProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeATSKeywords> | null>(null);
  const resumeData = useResumeStore((state) => state.resumeData);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert('Por favor, cole a descrição da vaga primeiro.');
      return;
    }
    const result = analyzeATSKeywords(resumeData, jobDescription);
    setAnalysis(result);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    if (score >= 40) return 'Regular';
    return 'Precisa melhorar';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Análise ATS de Palavras-chave
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Input para descrição da vaga */}
          {!analysis && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cole a descrição da vaga aqui:
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Cole aqui a descrição completa da vaga para análise de palavras-chave..."
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim()}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Target className="w-5 h-5" />
                Analisar Palavras-chave
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Como funciona:</strong> O sistema analisa seu currículo e compara com as palavras-chave da descrição da vaga. 
                  Quanto mais palavras-chave correspondentes, maior sua pontuação ATS e mais chances de passar pelos filtros automáticos.
                </p>
              </div>
            </div>
          )}

          {/* Resultados da análise */}
          {analysis && (
            <div className="space-y-6">
              {/* Score geral */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Pontuação ATS</h4>
                    <p className="text-sm text-gray-600">Compatibilidade com a vaga</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                      {analysis.score}%
                    </div>
                    <div className={`text-sm font-medium ${getScoreColor(analysis.score)}`}>
                      {getScoreLabel(analysis.score)}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      analysis.score >= 80 ? 'bg-green-500' :
                      analysis.score >= 60 ? 'bg-yellow-500' :
                      analysis.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                  <span>{analysis.matchedKeywords} de {analysis.totalKeywords} palavras-chave encontradas</span>
                </div>
              </div>

              {/* Palavras-chave encontradas */}
              {analysis.matchedList.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Palavras-chave encontradas ({analysis.matchedList.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.matchedList.map((match, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5"
                      >
                        <span className="text-sm font-medium text-green-700 capitalize">
                          {match.keyword}
                        </span>
                        <span className="text-xs text-green-600">
                          ({match.count}x em {match.location})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Palavras-chave faltantes */}
              {analysis.missingKeywords.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    Palavras-chave faltantes ({analysis.missingKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-1.5 text-sm capitalize"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sugestões */}
              {analysis.suggestions.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                    Sugestões de melhoria
                  </h4>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex gap-3">
                <button
                  onClick={() => setAnalysis(null)}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Nova Análise
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
