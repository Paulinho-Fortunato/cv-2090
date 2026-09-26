import { useState } from 'react';
import { FileText, X, Loader2, Download, Copy, Check } from 'lucide-react';
import { aiService, CoverLetter } from '../../lib/aiService';
import { useResumeStore } from '../../lib/store';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoverLetterModal({ isOpen, onClose }: CoverLetterModalProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState<'formal' | 'casual' | 'enthusiastic'>('formal');
  const [coverLetter, setCoverLetter] = useState<CoverLetter | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const resumeData = useResumeStore((state) => state.resumeData);
  const theme = useResumeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      alert('Por favor, descreva a vaga');
      return;
    }

    setLoading(true);
    try {
      const result = await aiService.generateCoverLetter(resumeData, jobDescription, tone);
      setCoverLetter(result);
    } catch (error) {
      console.error('Erro ao gerar carta:', error);
      alert('Erro ao gerar carta de apresentação');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!coverLetter) return;
    
    try {
      await navigator.clipboard.writeText(coverLetter.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const downloadAsText = () => {
    if (!coverLetter) return;

    const blob = new Blob([coverLetter.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `carta-apresentacao-${resumeData.basics.fullName || 'curriculo'}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setJobDescription('');
    setCoverLetter(null);
    setTone('formal');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <FileText className="w-5 h-5 text-blue-600" />
            Gerador de Carta de Apresentação
          </h3>
          <button
            onClick={onClose}
            className={`text-lg font-bold ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!coverLetter ? (
            <>
              {/* Job Description Input */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Descrição da Vaga
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                  placeholder="Cole aqui a descrição da vaga para a qual você está se candidatando..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Tone Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tom da Carta
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTone('formal')}
                    className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      tone === 'formal'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : isDark
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Formal
                  </button>
                  <button
                    onClick={() => setTone('casual')}
                    className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      tone === 'casual'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : isDark
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Casual
                  </button>
                  <button
                    onClick={() => setTone('enthusiastic')}
                    className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      tone === 'enthusiastic'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : isDark
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Entusiasta
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateCoverLetter}
                disabled={loading || !jobDescription.trim()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Gerar Carta de Apresentação
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Generated Cover Letter */}
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {coverLetter.tone === 'formal' ? 'Formal' : coverLetter.tone === 'casual' ? 'Casual' : 'Entusiasta'}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {coverLetter.wordCount} palavras
                    </span>
                  </div>
                </div>
                <div className={`whitespace-pre-wrap text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {coverLetter.content}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                    copied
                      ? 'bg-green-600 text-white'
                      : isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>
                <button
                  onClick={downloadAsText}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                    isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Baixar TXT
                </button>
                <button
                  onClick={reset}
                  className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Nova Carta
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
