import { useState, useEffect } from 'react';
import { Sparkles, X, Loader2, Key, ExternalLink, Bot } from 'lucide-react';
import { aiService, AISuggestion, AVAILABLE_MODELS } from '../../lib/aiService';
import { useResumeStore } from '../../lib/store';

interface AISuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AISuggestionsModal({ isOpen, onClose }: AISuggestionsModalProps) {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(aiService.getModel());
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const resumeData = useResumeStore((state) => state.resumeData);
  const theme = useResumeStore((state) => state.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isOpen) {
      loadSuggestions();
      setApiKey(aiService.getApiKey());
      setSelectedModel(aiService.getModel());
    }
  }, [isOpen]);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const result = await aiService.analyzeResume(resumeData);
      setSuggestions(result);
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    aiService.setApiKey(apiKey);
    aiService.setModel(selectedModel);
    setShowApiKeyInput(false);
    loadSuggestions();
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    aiService.setModel(modelId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'summary':
        return '📝';
      case 'experience':
        return '💼';
      case 'skills':
        return '🎯';
      case 'improvement':
        return '💡';
      default:
        return '✨';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'summary':
        return isDark ? 'bg-blue-900/30 text-blue-300 border-blue-800' : 'bg-blue-100 text-blue-700 border-blue-200';
      case 'experience':
        return isDark ? 'bg-green-900/30 text-green-300 border-green-800' : 'bg-green-100 text-green-700 border-green-200';
      case 'skills':
        return isDark ? 'bg-purple-900/30 text-purple-300 border-purple-800' : 'bg-purple-100 text-purple-700 border-purple-200';
      case 'improvement':
        return isDark ? 'bg-orange-900/30 text-orange-300 border-orange-800' : 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return isDark ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Sparkles className="w-5 h-5 text-purple-600" />
            Sugestões de IA (OpenRouter)
          </h3>
          <button
            onClick={onClose}
            className={`text-lg font-bold ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* API Key Configuration */}
          {!aiService.isConfigured() && (
            <div className={`${isDark ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4`}>
              {!showApiKeyInput ? (
                <div>
                  <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'} mb-2`}>
                    💡 Configure sua API Key gratuita da OpenRouter para sugestões avançadas com IA
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowApiKeyInput(true)}
                      className="flex items-center gap-1 bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-700"
                    >
                      <Key className="w-4 h-4" />
                      Configurar API Key
                    </button>
                    <a
                      href="https://openrouter.ai/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-yellow-700 text-sm hover:underline"
                    >
                      Obter chave gratuita
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'} mb-1 block`}>
                      OpenRouter API Key:
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Cole sua API Key aqui"
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'} mb-1 block`}>
                      Modelo de IA:
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => handleModelChange(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    >
                      {AVAILABLE_MODELS.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name} ({model.provider}) {model.free ? '- GRÁTIS' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveApiKey}
                      disabled={!apiKey.trim()}
                      className="bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-700 disabled:opacity-50"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setShowApiKeyInput(false)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Model Selector (when configured) */}
          {aiService.isConfigured() && (
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Modelo: {AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name}
                  </span>
                </div>
                <button
                  onClick={() => setShowApiKeyInput(true)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Alterar
                </button>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Analisando seu currículo com IA...
              </p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg p-4`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTypeIcon(suggestion.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {suggestion.title}
                        </h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeColor(suggestion.type)}`}>
                          {Math.round(suggestion.confidence * 100)}% confiança
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {suggestion.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Nenhuma sugestão disponível no momento
              </p>
            </div>
          )}

          {/* Retry Button */}
          {!loading && (
            <button
              onClick={loadSuggestions}
              className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Gerar Novas Sugestões
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
