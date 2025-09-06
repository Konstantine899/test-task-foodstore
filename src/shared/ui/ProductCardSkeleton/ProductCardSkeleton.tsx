import React, { memo } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import * as styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = memo(() => {
  return (
    <article className={styles['card-skeleton']}>
      {/* Область картинки с анимацией */}
      <div className={styles['image-container']}>
        <Skeleton
          height="100%"
          width="100%"
          className={styles['image-skeleton']}
        />
      </div>

      {/* Контент без анимации */}
      <div className={styles.content}>
        {/* Название товара */}
        <Skeleton height={2} width="85%" className={styles['title-skeleton']} />

        {/* Описание/ингредиенты */}
        <Skeleton
          height={2}
          width="100%"
          className={styles['description-skeleton']}
        />
        <Skeleton
          height={2}
          width="70%"
          className={styles['description-skeleton']}
        />

        {/* Футер с ценой и кнопкой */}
        <div className={styles.footer}>
          <Skeleton
            height={2}
            width={80}
            className={styles['price-skeleton']}
          />
          <Skeleton
            height={40}
            width={40}
            className={styles['button-skeleton']}
          />
        </div>
      </div>
    </article>
  );
});

ProductCardSkeleton.displayName = 'ProductCardSkeleton';
