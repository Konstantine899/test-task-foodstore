import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
  } from 'react';
  
  interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
    lazy?: boolean;
    size?: 'thumbnail' | 'medium' | 'large';
  }
  
  export const AppImage = memo((props: AppImageProps) => {
    const {
      className,
      src,
      alt = 'image',
      fallback,
      errorFallback,
      lazy = false,
      size,
      ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const getImageSrc = (originalSrc: string | undefined, imageSize?: string) => {
      if (!originalSrc || !imageSize) return originalSrc;
      
      if (originalSrc.startsWith('http')) return originalSrc;
      const lastDotIndex = originalSrc.lastIndexOf('.');
      if (lastDotIndex === -1) return originalSrc;
      
      const nameWithoutExt = originalSrc.substring(0, lastDotIndex);
      const extension = originalSrc.substring(lastDotIndex);
      
      return `${nameWithoutExt}_${imageSize}${extension}`;
    };

    const imageSrc = getImageSrc(src, size);

    useLayoutEffect(() => {
      if (!imageSrc) {
        setIsLoading(false);
        setHasError(true);
        return;
      }

      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setIsLoading(false);
        setHasError(false);
      };
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }, [imageSrc]);
  
    if (isLoading && fallback) {
      return fallback;
    }
  
    if (hasError && errorFallback) {
      return errorFallback;
    }
  
    return (
      <img 
        className={className} 
        src={imageSrc} 
        alt={alt} 
        loading={lazy ? "lazy" : "eager"}
        {...otherProps} 
      />
    );
  });

  AppImage.displayName = 'AppImage';
  