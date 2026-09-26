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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Atualizar tamanho da janela
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Calcular posição do tooltip com responsividade
  const getTooltipPosition = () => {
    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width < 1024;
    
    // Ajustar dimensões baseado no tamanho da tela
    let tooltipWidth = 320;
    let tooltipHeight = 220;
    let padding = 16;

    if (isMobile) {
      tooltipWidth = Math.min(280, windowSize.width - 32);
      tooltipHeight = 240;
      padding = 12;
    } else if (isTablet) {
      tooltipWidth = 300;
      tooltipHeight = 220;
      padding = 14;
    }

    const margin = 16; // Margem de segurança
    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'top':
        top = targetRect.top - tooltipHeight - padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        left = targetRect.left - tooltipWidth - padding;
        break;
      case 'right':
      default:
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        left = targetRect.right + padding;
    }

    // Ajustar para não sair da tela (horizontal)
    if (left < margin) {
      left = margin;
    } else if (left + tooltipWidth > windowSize.width - margin) {
      left = windowSize.width - tooltipWidth - margin;
    }

    // Ajustar para não sair da tela (vertical)
    if (top < margin) {
      top = margin;
    } else if (top + tooltipHeight > windowSize.height - margin) {
      top = windowSize.height - tooltipHeight - margin;
    }

    return {
      top: Math.max(0, top),
      left: Math.max(0, left),
      width: tooltipWidth,
      maxHeight: tooltipHeight,
    };
  };

  const tooltipPosition = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 pointer-events-auto transition-opacity duration-300"
        onClick={onSkip}
      />

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
        <div className="w-full h-full rounded-lg bg-white/10 backdrop-blur-sm border-2 border-white/30" />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="absolute bg-white rounded-xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            width: tooltipPosition.width,
            maxHeight: tooltipPosition.maxHeight,
          }}
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-gray-100">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  Passo {currentStep + 1} de {tourSteps.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">
                {step.title}
              </h3>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-1"
              aria-label="Fechar tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.content}
            </p>

            {/* Progress Bar */}
            <div className="mt-5">
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
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-t border-gray-100 bg-gray-50">
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap order-2 sm:order-1"
            >
              Pular tour
            </button>
            <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex-1 sm:flex-none"
                >
                  <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
              >
                {isLastStep ? (
                  <>
                    <span className="hidden sm:inline">Concluir</span>
                    <span className="sm:hidden">OK</span>
                    <Check className="w-4 h-4 flex-shrink-0" />
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Próximo</span>
                    <span className="sm:hidden">Avançar</span>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
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
