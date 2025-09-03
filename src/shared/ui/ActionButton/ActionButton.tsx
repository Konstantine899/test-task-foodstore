// src/shared/ui/ActionButton/ActionButton.tsx
import React from 'react';
import * as styles from './ActionButton.module.scss';
import { Icon } from '../Icon';

interface ActionButtonProps {
  icon?: 'search' | 'cart' | 'menu';
  text?: string;
  badge?: number;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  badge,
  onClick,
  ariaLabel,
  className = '',
}) => {
  return (
    <button
      className={`${styles.actionButton} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && <Icon name={icon} />}
      {text && <span className={styles.buttonText}>{text}</span>}
      {badge !== undefined && badge > 0 && (
        <span className={styles.badge}>{badge}</span>
      )}
    </button>
  );
};