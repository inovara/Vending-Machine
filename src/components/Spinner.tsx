import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'gray';
  className?: string;
  text?: string;
  showText?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  text,
  showText = false
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      case '2xl':
        return 'w-16 h-16';
      default:
        return 'w-6 h-6';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'border-inovara-primary/20 border-t-inovara-primary';
      case 'secondary':
        return 'border-inovara-secondary/20 border-t-inovara-secondary';
      case 'accent':
        return 'border-inovara-accent/20 border-t-inovara-accent';
      case 'white':
        return 'border-white/20 border-t-white';
      case 'gray':
        return 'border-gray-300 border-t-gray-600';
      default:
        return 'border-inovara-primary/20 border-t-inovara-primary';
    }
  };

  const getTextSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'md':
        return 'text-sm';
      case 'lg':
        return 'text-base';
      case 'xl':
        return 'text-lg';
      case '2xl':
        return 'text-xl';
      default:
        return 'text-sm';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`
          ${getSizeClasses()}
          border-4 rounded-full animate-spin
          ${getColorClasses()}
        `}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {(showText || text) && (
        <div className={`mt-2 ${getTextSizeClasses()} font-medium text-center`}>
          {text || 'Loading...'}
        </div>
      )}
    </div>
  );
};

export default Spinner;
