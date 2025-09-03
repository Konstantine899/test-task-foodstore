// src/shared/ui/ActionButton/ActionButton.tsx
import React, { memo, useCallback } from 'react';
import * as styles from './ActionButton.module.scss';

interface ActionButtonProps {
  icon?: React.ReactNode;
  text?: string;
  badge?: number;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

export const ActionButton = memo<ActionButtonProps>(({
  icon,
  text,
  badge,
  onClick,
  ariaLabel,
  className = '',
}) => {
  // Мемоизированный обработчик клика
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  // Мемоизированные классы
  const buttonClasses = useCallback(() => 
    `${styles.actionButton} ${className}`, 
    [className]
  );

  return (
    <button
      className={buttonClasses()}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {icon}
      {text && <span className={styles.buttonText}>{text}</span>}
      {badge !== undefined && badge > 0 && (
        <span className={styles.badge}>{badge}</span>
      )}
    </button>
  );
});

ActionButton.displayName = 'ActionButton';