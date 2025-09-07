import React, { memo } from 'react';
import * as styles from './ImageErrorFallback.module.scss';

interface ImageErrorFallbackProps {
  className?: string;
  text?: string;
  imageSrc?: string;
}

export const ImageErrorFallback = memo<ImageErrorFallbackProps>(
  ({
    className = '',
    text = 'Нет фото',
    imageSrc = '/test-task-foodstore/images/no-image.jpg',
  }) => {
    return (
      <div className={`${styles['error-fallback']} ${className}`}>
        <img
          src={imageSrc}
          alt="Изображение недоступно"
          className={styles['error-image']}
        />
        <span className={styles['error-text']}>{text}</span>
      </div>
    );
  },
);

ImageErrorFallback.displayName = 'ImageErrorFallback';
