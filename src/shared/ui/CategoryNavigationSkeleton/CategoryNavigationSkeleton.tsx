import React, { memo } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import * as styles from './CategoryNavigationSkeleton.module.scss';

interface CategoryNavigationSkeletonProps {
  className?: string;
  isCartOpen?: boolean;
}

export const CategoryNavigationSkeleton = memo<CategoryNavigationSkeletonProps>(({
  className = '',
  isCartOpen = false,
}) => {
  const mods = { [styles.cartOpen]: isCartOpen };

  return (
    <nav className={`${styles.navigation} ${className}`}>
      <ul className={`${styles.list} ${isCartOpen ? styles.cartOpen : ''}`}>
        {Array.from({ length: 6 }, (_, index) => (
          <li key={`skeleton-${index}`} className={styles.item}>
            <Skeleton
              height={40}
              width={80 + Math.random() * 40} // Случайная ширина 80-120px
              className={styles.buttonSkeleton}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
});

CategoryNavigationSkeleton.displayName = 'CategoryNavigationSkeleton';
