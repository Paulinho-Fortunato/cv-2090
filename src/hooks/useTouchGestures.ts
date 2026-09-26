import { useEffect, useRef, useCallback } from 'react';

interface TouchGestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: (x: number, y: number) => void;
  onLongPress?: (x: number, y: number) => void;
  threshold?: number;
  longPressDuration?: number;
}

export function useTouchGestures(config: TouchGestureConfig) {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    threshold = 50,
    longPressDuration = 500,
  } = config;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    // Iniciar timer para long press
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress(touch.clientX, touch.clientY);
        touchStart.current = null;
      }, longPressDuration);
    }
  }, [onLongPress, longPressDuration]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Cancelar long press se houver movimento
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const deltaTime = Date.now() - touchStart.current.time;

    // Cancelar long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    // Detectar swipe
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > threshold || absDeltaY > threshold) {
      if (absDeltaX > absDeltaY) {
        // Swipe horizontal
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Swipe vertical
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    } else if (deltaTime < 300 && onTap) {
      // Tap (toque rápido sem movimento significativo)
      onTap(touch.clientX, touch.clientY);
    }

    touchStart.current = null;
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, threshold]);

  useEffect(() => {
    const element = document.documentElement;
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
}

// Hook para navegação entre seções com gestos
export function useSectionNavigation(
  sections: string[],
  currentSection: string,
  onSectionChange: (section: string) => void
) {
  const currentIndex = sections.indexOf(currentSection);

  const handleSwipeLeft = useCallback(() => {
    if (currentIndex < sections.length - 1) {
      onSectionChange(sections[currentIndex + 1]);
    }
  }, [currentIndex, sections, onSectionChange]);

  const handleSwipeRight = useCallback(() => {
    if (currentIndex > 0) {
      onSectionChange(sections[currentIndex - 1]);
    }
  }, [currentIndex, sections, onSectionChange]);

  useTouchGestures({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 80,
  });
}

// Hook para feedback tátil (vibração)
export function useHapticFeedback() {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  return { vibrate };
}
