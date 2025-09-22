import React, { memo } from 'react';

interface ImageSkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  variant?: 'default' | 'card' | 'thumbnail' | 'hero';
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = memo(({
  className = '',
  width,
  height,
  rounded = 'lg',
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200';
      case 'thumbnail':
        return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200';
      case 'hero':
        return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200';
      default:
        return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200';
    }
  };

  const getRoundedClass = () => {
    switch (rounded) {
      case 'none':
        return 'rounded-none';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case '2xl':
        return 'rounded-2xl';
      case '3xl':
        return 'rounded-3xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        ${getVariantStyles()}
        ${getRoundedClass()}
        ${className}
      `}
      style={{ width, height }}
      role="img"
      aria-label="Loading image..."
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      
      {/* Content placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 text-gray-400">
          <svg
            className="w-full h-full animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

ImageSkeleton.displayName = 'ImageSkeleton';

export default ImageSkeleton;
