import { memo } from 'react';
import { Check, Layout, Briefcase, Code, Layers, Palette, Sparkles } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { translations } from '../../types/resume';
import { useLanguage, useTheme, useTemplate } from '../../hooks/useResume';
import { TemplateId } from '../../types/resume';

interface TemplateSelectorProps {
  onSelect: (template: TemplateId) => void;
}

const templates = [
  {
    id: 'modern' as TemplateId,
    name: 'Moderno',
    icon: Layout,
    description: 'Design clean e profissional',
    colors: ['from-blue-500 to-blue-600', 'bg-blue-500'],
  },
  {
    id: 'executive' as TemplateId,
    name: 'Executivo',
    icon: Briefcase,
    description: 'Formal e corporativo',
    colors: ['from-gray-700 to-gray-900', 'bg-gray-800'],
  },
  {
    id: 'tech' as TemplateId,
    name: 'Tech/Dev',
    icon: Code,
    description: 'Visual de IDE/código',
    colors: ['from-green-500 to-emerald-600', 'bg-green-600'],
  },
  {
    id: 'compact' as TemplateId,
    name: 'Compacto',
    icon: Layers,
    description: 'Uma página, denso',
    colors: ['from-purple-500 to-purple-600', 'bg-purple-600'],
  },
  {
    id: 'creative' as TemplateId,
    name: 'Criativo',
    icon: Palette,
    description: 'Colorido e ousado',
    colors: ['from-pink-500 to-rose-600', 'bg-pink-600'],
  },
  {
    id: 'custom' as TemplateId,
    name: '✨ Personalizado',
    icon: Sparkles,
    description: 'Arraste e personalize',
    colors: ['from-indigo-500 to-purple-600', 'bg-indigo-600'],
  },
];

export const TemplateSelector = memo(function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const language = useLanguage();
  const theme = useTheme();
  const currentTemplate = useTemplate();
  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <div className="space-y-3">
      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Escolha o Template
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = currentTemplate === template.id;
          
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`relative group p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? isDark
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                    : 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
                  : isDark
                  ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Template Preview */}
              <div className={`w-full h-16 rounded-lg mb-2 bg-gradient-to-br ${template.colors[0]} flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white/90" />
              </div>

              {/* Template Info */}
              <div className="text-left">
                <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {template.name}
                </h4>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});
