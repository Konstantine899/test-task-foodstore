import React, { memo } from 'react';
import * as styles from './ImageErrorFallback.module.scss';

interface ImageErrorFallbackProps {
  className?: string;
  text?: string;
  imageSrc?: string;
}

export const ImageErrorFallback = memo<ImageErrorFallbackProps>(({ 
  className = '', 
  text = 'Нет фото',
  imageSrc = '/images/no-image.jpg'
}) => {
  return (
    <div className={`${styles.errorFallback} ${className}`}>
      <img 
        src={imageSrc} 
        alt="Изображение недоступно"
        className={styles.errorImage}
      />
      <span className={styles.errorText}>{text}</span>
    </div>
  );
});

ImageErrorFallback.displayName = 'ImageErrorFallback';
