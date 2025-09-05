import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './ActionButton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ActionButtonProps {
  icon?: React.ReactNode;
  text?: string;
  badge?: number;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
  isAnimating?: boolean;
  disabled?: boolean;
}

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