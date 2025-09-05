//
import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls  from './Skeleton.module.scss';

/**
 * Пропсы для компонента Skeleton
 */
interface SkeletonProps {
  /** CSS класс для стилизации */
  className?: string;
  /** Высота скелетона (в px или %) */
  height?: string | number;
  /** Ширина скелетона (в px или %) */
  width?: string | number;
  /** Радиус скругления углов (для круглых, квадратных, прямоугольных форм) */
  border?: string;
}

/**
 * Компонент скелетона для отображения состояния загрузки
 * 
 * Используется как placeholder во время загрузки контента.
 * Поддерживает настройку размеров и формы через пропсы.
 * 
 * @component
 * @param props - Пропсы компонента
 * @returns JSX элемент скелетона
 * 
 * @example
 * ```tsx
 * <Skeleton
 *   height="20px"
 *   width="100%"
 *   border="4px"
 *   className="custom-skeleton"
 * />
 * ```
 */
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
    <div className={classNames(cls.Skeleton, {}, [className])} />
  );
});
