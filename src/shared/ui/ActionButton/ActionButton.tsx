import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './ActionButton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

/**
 * Пропсы для компонента ActionButton
 */
interface ActionButtonProps {
  /** Иконка для отображения в кнопке */
  icon?: React.ReactNode;
  /** Текст для отображения в кнопке */
  text?: string;
  /** Число для отображения в бейдже */
  badge?: number;
  /** Обработчик клика по кнопке */
  onClick?: () => void;
  /** Aria-label для доступности */
  ariaLabel: string;
  /** CSS класс для стилизации */
  className?: string;
  /** Флаг анимации (для визуальных эффектов) */
  isAnimating?: boolean;
  /** Флаг отключения кнопки */
  disabled?: boolean;
}

/**
 * Универсальная кнопка действия с поддержкой иконок, текста и бейджей
 * 
 * Используется в хедере для различных действий (меню, поиск, корзина).
 * Поддерживает состояния загрузки, анимации и отключения.
 * 
 * @component
 * @param props - Пропсы компонента
 * @returns JSX элемент кнопки
 * 
 * @example
 * ```tsx
 * <ActionButton
 *   icon={<SearchIcon />}
 *   text="Поиск"
 *   badge={5}
 *   onClick={handleSearch}
 *   ariaLabel="Открыть поиск"
 *   isAnimating={isSearching}
 * />
 * ```
 */
export const ActionButton = memo<ActionButtonProps>(({
  icon,
  text,
  badge,
  onClick,
  ariaLabel,
  className = '',
  isAnimating = false,
  disabled = false,
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick?.();
    }
  }, [onClick, disabled]);

  const buttonClasses = useMemo(() => {
    const mods = { 
      [styles.cartOpen]: className === 'cartOpen',
      [styles.disabled]: disabled
    };
    const extra = className && className !== 'cartOpen' ? [className] : [];
    return classNames(styles.actionButton, mods, extra);
  }, [className, disabled]);

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {icon}
      {text && (
        <span className={classNames(styles.buttonText, { [styles.animating]: isAnimating })}>
          {text}
        </span>
      )}
      {badge !== undefined && badge > 0 && (
        <span className={styles.badge}>{badge}</span>
      )}
    </button>
  );
});

ActionButton.displayName = 'ActionButton';