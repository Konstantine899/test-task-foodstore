import React, { memo } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import * as styles from './TitleSkeleton.module.scss';

interface TitleSkeletonProps {
  className?: string;
  width?: string | number;
}

export const TitleSkeleton = memo<TitleSkeletonProps>(({
  className = '',
  width = '60%',
}) => {
  return (
    <Skeleton
      height={32}
      width={width}
      className={`${styles['title-skeleton']} ${className}`}
    />
  );
});

TitleSkeleton.displayName = 'TitleSkeleton';
