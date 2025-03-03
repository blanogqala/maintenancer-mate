
import { useEffect, useState } from 'react';

// Used to create staggered animations for lists
export const useStaggeredAnimation = (itemCount: number, delay = 50): number[] => {
  const [indices, setIndices] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setIndices(prev => [...prev, i]);
      }, delay * i);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [itemCount, delay]);

  return indices;
};

// Used to create a loading sequence
export const useSequentialAnimation = (steps: number, interval: number) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps) {
      const timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, interval);
      
      return () => clearTimeout(timeout);
    }
  }, [currentStep, steps, interval]);

  return currentStep;
};

// Hook to delay mounting of components
export const useDelayedAppear = (delay: number): boolean => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return shouldRender;
};

// Types for animation variants
export type AnimationVariant = 
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'float';

// Return CSS classes for animations based on variant
export const getAnimationClass = (variant: AnimationVariant): string => {
  switch (variant) {
    case 'fadeIn':
      return 'animate-fade-in';
    case 'slideUp':
      return 'animate-slide-up';
    case 'slideDown':
      return 'animate-slide-down';
    case 'slideLeft':
      return 'animate-slide-left';
    case 'slideRight':
      return 'animate-slide-right';
    case 'scaleIn':
      return 'animate-scale-in';
    case 'float':
      return 'animate-float';
    default:
      return '';
  }
};
