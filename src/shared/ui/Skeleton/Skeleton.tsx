import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
  animation?: 'wave' | 'pulse' | 'none';
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className, 
    height, 
    width, 
    border,
    animation = 'wave',
    variant = 'rectangular'
  } = props;

  const styles: CSSProperties = {
    height,
    width,
    borderRadius: border,
  };

  const mods = {
    [cls[animation]]: animation !== 'none',
    [cls[variant]]: true,
  };

  return (
    <div 
      className={classNames(cls.Skeleton, mods, [className])} 
      style={styles} 
    />
  );
});

Skeleton.displayName = 'Skeleton';
