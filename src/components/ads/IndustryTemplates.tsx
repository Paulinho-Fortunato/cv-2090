import { useState } from 'react';
import { X, Briefcase, Code, Palette, GraduationCap, Heart, Building2 } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { translations } from '../../types/resume';
import { TemplateId } from '../../types/resume';

interface IndustryTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IndustryTemplate {
  id: string;
  name: string;
  icon: any;
  description: string;
  template: TemplateId;
  color: string;
}

const industryTemplates: IndustryTemplate[] = [
  {
    id: 'tech',
    name: 'Tecnologia',
    icon: Code,
    description: 'Ideal para desenvolvedores, engenheiros de software e profissionais de TI',
    template: 'tech',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'design',
    name: 'Design & Criativo',
    icon: Palette,
    description: 'Perfeito para designers, artistas e profissionais criativos',
    template: 'creative',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'business',
    name: 'Negócios & Executivo',
    icon: Building2,
    description: 'Ideal para executivos, gestores e profissionais de negócios',
    template: 'executive',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'education',
    name: 'Educação & Acadêmico',
    icon: GraduationCap,
    description: 'Perfeito para professores, pesquisadores e acadêmicos',
    template: 'modern',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'health',
    name: 'Saúde & Medicina',
    icon: Heart,
    description: 'Ideal para médicos, enfermeiros e profissionais de saúde',
    template: 'compact',
    color: 'from-red-500 to-pink-600',
  },
  {
    id: 'general',
    name: 'Geral',
    icon: Briefcase,
    description: 'Template versátil para qualquer profissão',
    template: 'modern',
    color: 'from-blue-500 to-blue-600',
  },
];

export function IndustryTemplates({ isOpen, onClose }: IndustryTemplatesProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const language = useResumeStore((state) => state.language);
  const theme = useResumeStore((state) => state.theme);
  const t = translations[language];
  const isDark = theme === 'dark';

  const handleSelectIndustry = (industry: IndustryTemplate) => {
    setSelectedIndustry(industry.id);
    setTemplate(industry.template);
    
    // Fechar modal após 1 segundo
    setTimeout(() => {
      onClose();
      setSelectedIndustry(null);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Briefcase className="w-5 h-5 text-blue-600" />
            Templates por Indústria
          </h3>
          <button onClick={onClose} className={`text-lg font-bold ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Selecione sua indústria para aplicar o template mais adequado ao seu perfil profissional
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryTemplates.map((industry) => {
              const Icon = industry.icon;
              const isSelected = selectedIndustry === industry.id;

              return (
                <button
                  key={industry.id}
                  onClick={() => handleSelectIndustry(industry)}
                  disabled={isSelected}
                  className={`relative group p-6 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isDark
                      ? 'border-gray-700 bg-gray-700/50 hover:border-gray-600 hover:bg-gray-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {/* Gradient Preview */}
                  <div className={`w-full h-20 rounded-lg mb-4 bg-gradient-to-br ${industry.color} flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white/90" />
                  </div>

                  {/* Content */}
                  <div className="text-left">
                    <h4 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {industry.name}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {industry.description}
                    </p>
                  </div>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Info Box */}
          <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
              💡 <strong>Dica:</strong> Cada template foi otimizado para destacar as competências mais valorizadas em sua indústria. 
              O template será aplicado automaticamente ao seu currículo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
