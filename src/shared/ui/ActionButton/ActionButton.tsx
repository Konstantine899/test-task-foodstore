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
}

export const ActionButton = memo<ActionButtonProps>(({
  icon,
  text,
  badge,
  onClick,
  ariaLabel,
  className = '',
  isAnimating = false,
}) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const buttonClasses = useMemo(() => {
    const mods = { [styles.cartOpen]: className === 'cartOpen' };
    const extra = className && className !== 'cartOpen' ? [className] : [];
    return classNames(styles.actionButton, mods, extra);
  }, [className]);

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      aria-label={ariaLabel}
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