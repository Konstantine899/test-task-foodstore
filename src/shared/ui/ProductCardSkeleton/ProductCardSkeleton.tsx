import React, { memo } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import * as styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = memo(() => {
  return (
    <article className={styles.cardSkeleton}>
      {/* Область картинки с анимацией */}
      <div className={styles.imageContainer}>
        <Skeleton
          height="100%"
          width="100%"
          className={styles.imageSkeleton}
        />
      </div>

      {/* Контент без анимации */}
      <div className={styles.content}>
        {/* Название товара */}
        <Skeleton
          height={2}
          width="85%"
          className={styles.titleSkeleton}
        />
        
        {/* Описание/ингредиенты */}
        <Skeleton
          height={2}
          width="100%"
          className={styles.descriptionSkeleton}
        />
        <Skeleton
          height={2}
          width="70%"
          className={styles.descriptionSkeleton}
        />

        {/* Футер с ценой и кнопкой */}
        <div className={styles.footer}>
          <Skeleton
            height={2}
            width={80}
            className={styles.priceSkeleton}
          />
          <Skeleton
            height={40}
            width={40}
            className={styles.buttonSkeleton}
          />
        </div>
      </div>
    </article>
  );
});

ProductCardSkeleton.displayName = 'ProductCardSkeleton';
