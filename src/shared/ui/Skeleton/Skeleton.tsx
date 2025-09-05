//
import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number; // может быть задана в px или в %
  width?: string | number;
  border?: string /* borderRadius. В одном случае мы хотим сделать скелетон круглый,
   в другом квадратный, прямоугольный.
    И вот этими параметрами мы можем управлять на уровне props */;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className, height, width, border
  } = props;

  const styles: CSSProperties = {
    height,
    width,
    borderRadius: border,
  };

  return (
    <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />
  );
});
