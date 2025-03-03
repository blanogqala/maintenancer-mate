
import React, { useEffect, useState } from 'react';
import { useDelayedAppear } from '@/utils/animations';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textPosition?: 'right' | 'bottom';
  className?: string;
  onClick?: () => void;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  showText = true,
  textPosition = 'right',
  className = '',
  onClick,
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const shouldShowText = useDelayedAppear(400);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  
  const containerClasses = textPosition === 'bottom' 
    ? 'flex flex-col items-center gap-2' 
    : 'flex items-center gap-3';
  
  return (
    <div className={`${containerClasses} ${className}`} onClick={onClick}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className={`absolute inset-0 bg-gradient-to-br from-handyhub-400 to-handyhub-600 rounded-xl ${isAnimating ? 'animate-pulse' : ''}`}></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">H</div>
      </div>
      
      {showText && shouldShowText && (
        <span className={`font-semibold ${textSizeClasses[size]} handyhub-gradient-text animate-fade-in`}>
          HandyHub
        </span>
      )}
    </div>
  );
};

export default AnimatedLogo;
