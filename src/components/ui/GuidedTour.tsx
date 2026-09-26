import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="basics-form"]',
    title: 'Dados Pessoais',
    content: 'Comece preenchendo suas informações básicas: nome, cargo desejado, contato e um resumo profissional.',
    position: 'right',
  },
  {
    target: '[data-tour="experience-form"]',
    title: 'Experiência Profissional',
    content: 'Adicione suas experiências de trabalho. Use verbos de ação e quantifique resultados quando possível.',
    position: 'right',
  },
  {
    target: '[data-tour="education-form"]',
    title: 'Formação Acadêmica',
    content: 'Liste sua formação educacional, incluindo graduação, pós-graduação e cursos relevantes.',
    position: 'right',
  },
  {
    target: '[data-tour="certifications-form"]',
    title: 'Certificações',
    content: 'Adicione certificações profissionais, cursos concluídos e treinamentos relevantes.',
    position: 'right',
  },
  {
    target: '[data-tour="projects-form"]',
    title: 'Projetos',
    content: 'Destaque projetos importantes que demonstrem suas habilidades e conquistas.',
    position: 'right',
  },
  {
    target: '[data-tour="skills-form"]',
    title: 'Habilidades',
    content: 'Liste suas habilidades técnicas e interpessoais. Use o auto-complete para sugestões.',
    position: 'right',
  },
  {
    target: '[data-tour="preview"]',
    title: 'Preview em Tempo Real',
    content: 'Veja como seu currículo fica em tempo real. Escolha entre 5 templates profissionais.',
    position: 'left',
  },
  {
    target: '[data-tour="download-button"]',
    title: 'Baixar PDF',
    content: 'Quando estiver satisfeito, baixe seu currículo em PDF com um clique.',
    position: 'top',
  },
  {
    target: '[data-tour="undo-redo"]',
    title: 'Desfazer/Refazer',
    content: 'Use Ctrl+Z para desfazer e Ctrl+Y para refazer alterações. Nunca perca seu trabalho!',
    position: 'bottom',
  },
  {
    target: '[data-tour="ats-button"]',
    title: 'Análise ATS',
    content: 'Analise seu currículo com palavras-chave de vagas para aumentar suas chances de aprovação.',
    position: 'bottom',
  },
];

interface GuidedTourProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export function GuidedTour({ isActive, onComplete, onSkip }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const updateTargetRect = () => {
      const step = tourSteps[currentStep];
      const element = document.querySelector(step.target);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    
    return () => window.removeEventListener('resize', updateTargetRect);
  }, [isActive, currentStep]);

  if (!isActive || !targetRect) return null;

  const step = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTooltipPosition = () => {
    const padding = 20;
    const tooltipWidth = 320;
    const tooltipHeight = 200;

    switch (step.position) {
      case 'top':
        return {
          top: targetRect.top - tooltipHeight - padding,
          left: targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2),
        };
      case 'bottom':
        return {
          top: targetRect.bottom + padding,
          left: targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2),
        };
      case 'left':
        return {
          top: targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2),
          left: targetRect.left - tooltipWidth - padding,
        };
      case 'right':
      default:
        return {
          top: targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2),
          left: targetRect.right + padding,
        };
    }
  };

  const position = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-auto" />

      {/* Highlight Target */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      >
        <div className="w-full h-full border-4 border-blue-500 rounded-lg shadow-lg shadow-blue-500/50" />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="absolute bg-white rounded-xl shadow-2xl p-6 pointer-events-auto"
          style={{
            top: position.top,
            left: position.left,
            width: 320,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Passo {currentStep + 1} de {tourSteps.length}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            {step.content}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex gap-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Pular tour
            </button>
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isLastStep ? (
                  <>
                    Concluir
                    <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Hook para gerenciar o tour
export function useGuidedTour() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('cv-builder-tour-completed');
    if (!hasSeenTour) {
      // Aguarda um pouco antes de iniciar o tour
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem('cv-builder-tour-completed', 'true');
    setIsActive(false);
  };

  const skipTour = () => {
    localStorage.setItem('cv-builder-tour-completed', 'true');
    setIsActive(false);
  };

  const restartTour = () => {
    localStorage.removeItem('cv-builder-tour-completed');
    setIsActive(true);
  };

  return {
    isActive,
    completeTour,
    skipTour,
    restartTour,
  };
}
