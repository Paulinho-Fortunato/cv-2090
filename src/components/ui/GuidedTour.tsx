import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="basics-form"]',
    title: 'Dados Pessoais',
    content: 'Comece preenchendo suas informações básicas: nome, cargo desejado, contato e um resumo profissional.',
    position: 'auto',
  },
  {
    target: '[data-tour="experience-form"]',
    title: 'Experiência Profissional',
    content: 'Adicione suas experiências de trabalho. Use verbos de ação e quantifique resultados quando possível.',
    position: 'auto',
  },
  {
    target: '[data-tour="education-form"]',
    title: 'Formação Acadêmica',
    content: 'Liste sua formação educacional, incluindo graduação, pós-graduação e cursos relevantes.',
    position: 'auto',
  },
  {
    target: '[data-tour="certifications-form"]',
    title: 'Certificações',
    content: 'Adicione certificações profissionais, cursos concluídos e treinamentos relevantes.',
    position: 'auto',
  },
  {
    target: '[data-tour="projects-form"]',
    title: 'Projetos',
    content: 'Destaque projetos importantes que demonstrem suas habilidades e conquistas.',
    position: 'auto',
  },
  {
    target: '[data-tour="skills-form"]',
    title: 'Habilidades',
    content: 'Liste suas habilidades técnicas e interpessoais. Use o auto-complete para sugestões.',
    position: 'auto',
  },
  {
    target: '[data-tour="preview"]',
    title: 'Preview em Tempo Real',
    content: 'Veja como seu currículo fica em tempo real. Escolha entre 6 templates profissionais.',
    position: 'auto',
  },
  {
    target: '[data-tour="download-button"]',
    title: 'Baixar PDF',
    content: 'Quando estiver satisfeito, baixe seu currículo em PDF com um clique.',
    position: 'auto',
  },
  {
    target: '[data-tour="undo-redo"]',
    title: 'Desfazer/Refazer',
    content: 'Use Ctrl+Z para desfazer e Ctrl+Y para refazer alterações. Nunca perca seu trabalho!',
    position: 'auto',
  },
  {
    target: '[data-tour="ats-button"]',
    title: 'Análise ATS',
    content: 'Analise seu currículo com palavras-chave de vagas para aumentar suas chances de aprovação.',
    position: 'auto',
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
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Atualizar posição do elemento alvo
  useEffect(() => {
    if (!isActive) return;

    const updateTargetRect = () => {
      const step = tourSteps[currentStep];
      const element = document.querySelector(step.target);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        
        // Scroll suave para o elemento
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });

        // Calcular posição do tooltip após o scroll
        setTimeout(() => {
          const newRect = element.getBoundingClientRect();
          setTargetRect(newRect);
          calculateTooltipPosition(newRect, step.position || 'auto');
        }, 300);
      }
    };

    updateTargetRect();
    
    const handleResize = () => {
      updateTargetRect();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive, currentStep]);

  // Calcular posição inteligente do tooltip
  const calculateTooltipPosition = (rect: DOMRect, preferredPosition: string) => {
    const tooltipWidth = isMobile ? Math.min(320, window.innerWidth - 32) : 360;
    const tooltipHeight = 280;
    const padding = 16;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    // Posicionamento automático baseado no espaço disponível
    if (preferredPosition === 'auto') {
      const spaceTop = rect.top;
      const spaceBottom = viewportHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = viewportWidth - rect.right;

      // Prioridade: bottom > top > right > left
      if (spaceBottom >= tooltipHeight + padding) {
        // Posicionar abaixo
        top = rect.bottom + padding;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
      } else if (spaceTop >= tooltipHeight + padding) {
        // Posicionar acima
        top = rect.top - tooltipHeight - padding;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
      } else if (spaceRight >= tooltipWidth + padding) {
        // Posicionar à direita
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.right + padding;
      } else if (spaceLeft >= tooltipWidth + padding) {
        // Posicionar à esquerda
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.left - tooltipWidth - padding;
      } else {
        // Fallback: centralizar na tela
        top = (viewportHeight - tooltipHeight) / 2;
        left = (viewportWidth - tooltipWidth) / 2;
      }
    } else {
      // Posicionamento manual
      switch (preferredPosition) {
        case 'top':
          top = rect.top - tooltipHeight - padding;
          left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
          break;
        case 'bottom':
          top = rect.bottom + padding;
          left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
          break;
        case 'left':
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
          left = rect.left - tooltipWidth - padding;
          break;
        case 'right':
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
          left = rect.right + padding;
          break;
      }
    }

    // Garantir que o tooltip não saia da viewport
    left = Math.max(padding, Math.min(left, viewportWidth - tooltipWidth - padding));
    top = Math.max(padding, Math.min(top, viewportHeight - tooltipHeight - padding));

    setTooltipPosition({ top, left });
  };

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

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'none' }}>
      {/* Overlay com gradiente */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ pointerEvents: 'auto' }}
      />

      {/* Highlight do elemento alvo */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
        }}
      >
        <div className="w-full h-full rounded-xl bg-white/20 backdrop-blur-md border-2 border-white/40 shadow-2xl" />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          ref={tooltipRef}
          className="absolute bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            width: isMobile ? 'calc(100vw - 32px)' : '360px',
            maxWidth: isMobile ? 'calc(100vw - 32px)' : '360px',
            pointerEvents: 'auto',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-white/90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentStep + 1} / {tourSteps.length}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {step.title}
                </h3>
              </div>
              <button
                onClick={onSkip}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                aria-label="Fechar tour"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              {step.content}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex gap-1.5">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                Pular tour
              </button>
              
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
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
      }, 1500);
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
