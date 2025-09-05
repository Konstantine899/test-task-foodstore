import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
  } from 'react';
  
  /**
 * Пропсы для компонента AppImage
 */
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** CSS класс для стилизации */
  className?: string;
  /** Компонент, отображаемый во время загрузки */
  fallback?: ReactElement;
  /** Компонент, отображаемый при ошибке загрузки */
  errorFallback?: ReactElement;
  /** Включить ленивую загрузку изображения */
  lazy?: boolean;
  /** Размер изображения для генерации URL с суффиксом */
  size?: 'thumbnail' | 'medium' | 'large';
}

/**
 * Улучшенный компонент изображения с поддержкой состояний загрузки и ошибок
 * 
 * Предоставляет:
 * - Автоматическое управление состояниями загрузки/ошибки
 * - Поддержку fallback компонентов
 * - Ленивую загрузку
 * - Генерацию URL для разных размеров изображений
 * 
 * @component
 * @param props - Пропсы компонента
 * @returns JSX элемент изображения или fallback компонент
 * 
 * @example
 * ```tsx
 * <AppImage
 *   src="/images/product.jpg"
 *   alt="Product image"
 *   size="medium"
 *   lazy
 *   fallback={<Skeleton />}
 *   errorFallback={<ImageErrorFallback />}
 * />
 * ```
 */
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
  