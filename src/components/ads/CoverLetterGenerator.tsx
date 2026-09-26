import { useState } from 'react';
import { X, FileText, Download, Copy, Check } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { translations } from '../../types/resume';

interface CoverLetterGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoverLetterGenerator({ isOpen, onClose }: CoverLetterGeneratorProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const resumeData = useResumeStore((state) => state.resumeData);
  const language = useResumeStore((state) => state.language);
  const theme = useResumeStore((state) => state.theme);
  const t = translations[language];
  const isDark = theme === 'dark';

  const generateCoverLetter = async () => {
    if (!jobTitle || !companyName) {
      alert('Por favor, preencha o cargo e o nome da empresa');
      return;
    }

    setIsGenerating(true);

    // Simular geração de carta (em produção, integraria com IA)
    setTimeout(() => {
      const letter = generateLetterContent();
      setGeneratedLetter(letter);
      setIsGenerating(false);
    }, 1500);
  };

  const generateLetterContent = () => {
    const { basics, experiences, education, skills } = resumeData;
    
    const recentExperience = experiences[0];
    const topSkills = skills.slice(0, 5).join(', ');
    
    return `${basics.fullName}
${basics.email} | ${basics.phone}
${basics.location}

${new Date().toLocaleDateString('pt-BR')}

${companyName}

Prezados,

Escrevo para expressar meu forte interesse na vaga de ${jobTitle} na ${companyName}. Com minha experiência em ${basics.headline} e minhas habilidades em ${topSkills}, acredito que posso contribuir significativamente para sua equipe.

${recentExperience ? `Atualmente, atuo como ${recentExperience.position} na ${recentExperience.company}, onde ${recentExperience.description || 'desenvolvi competências relevantes para esta posição'}. Esta experiência me proporcionou uma visão prática e estratégica que alinharei com os objetivos da ${companyName}.` : `Minha formação em ${education[0]?.degree || 'área relevante'} e minhas habilidades técnicas me preparam para os desafios desta posição.`}

Durante minha trajetória profissional, desenvolvi competências em ${topSkills}, que considero essenciais para o cargo de ${jobTitle}. Minha capacidade de ${skills[0] || 'resolver problemas'} e ${skills[1] || 'trabalhar em equipe'} me permite entregar resultados consistentes e de alta qualidade.

Estou entusiasmado com a oportunidade de contribuir para a ${companyName} e acredito que minha combinação de experiência técnica, habilidades interpessoais e dedicação me tornam um candidato ideal para esta posição.

Agradeço a atenção e coloco-me à disposição para uma entrevista, onde poderei detalhar como minhas competências podem agregar valor à sua equipe.

Atenciosamente,
${basics.fullName}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carta_apresentacao_${companyName}_${jobTitle}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <FileText className="w-5 h-5 text-blue-600" />
            Gerador de Carta de Apresentação
          </h3>
          <button onClick={onClose} className={`text-lg font-bold ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!generatedLetter ? (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cargo Desejado *
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Ex: Desenvolvedor Full Stack"
                  className={`w-full px-4 py-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ex: Tech Solutions Ltda"
                  className={`w-full px-4 py-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Descrição da Vaga (Opcional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Cole aqui a descrição da vaga para personalizar a carta..."
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg resize-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>

              <button
                onClick={generateCoverLetter}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Gerando...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Gerar Carta
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <pre className={`whitespace-pre-wrap font-sans text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {generatedLetter}
                </pre>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    copied
                      ? 'bg-green-600 text-white'
                      : isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
                <button
                  onClick={downloadAsText}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Baixar TXT
                </button>
                <button
                  onClick={() => setGeneratedLetter('')}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Nova Carta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
