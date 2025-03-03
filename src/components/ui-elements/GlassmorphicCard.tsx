
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'dark';
  withHover?: boolean;
  withBorder?: boolean;
  onClick?: () => void;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  variant = 'default',
  withHover = false,
  withBorder = true,
  onClick,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'strong':
        return 'bg-white/80 backdrop-blur-xl shadow-glass-strong';
      case 'dark':
        return 'bg-black/40 backdrop-blur-lg text-white';
      default:
        return 'bg-white/70 backdrop-blur-lg shadow-glass';
    }
  };

  const borderClass = withBorder 
    ? variant === 'dark' 
      ? 'border border-white/10' 
      : 'border border-white/20' 
    : '';

  const hoverClass = withHover 
    ? 'transition-all duration-300 hover:shadow-glass-strong hover:bg-white/90 hover:-translate-y-1' 
    : '';

  return (
    <div 
      className={cn(
        'rounded-xl p-6',
        getVariantClasses(),
        borderClass,
        hoverClass,
        className,
        onClick ? 'cursor-pointer' : ''
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
