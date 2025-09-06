import React, { memo } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import * as styles from './ActionButtonSkeleton.module.scss';

interface ActionButtonSkeletonProps {
  className?: string;
  hasText?: boolean;
  hasBadge?: boolean;
}

export const ActionButtonSkeleton = memo<ActionButtonSkeletonProps>(
  ({ className = '', hasText = false, hasBadge = false }) => {
    return (
      <div className={`${styles['action-button-skeleton']} ${className}`}>
        {/* Иконка */}
        <Skeleton
          height={20}
          width={20}
          border="50%"
          className={styles['icon-skeleton']}
        />

        {/* Текст (если есть) */}
        {hasText && (
          <Skeleton
            height={14}
            width={60}
            className={styles['text-skeleton']}
          />
        )}

        {/* Бейдж (если есть) */}
        {hasBadge && (
          <Skeleton
            height={16}
            width={16}
            border="50%"
            className={styles['badge-skeleton']}
          />
        )}
      </div>
    );
  },
);

ActionButtonSkeleton.displayName = 'ActionButtonSkeleton';
