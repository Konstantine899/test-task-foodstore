// src/shared/ui/Badge/Badge.tsx
import React, { memo } from 'react';
import * as styles from './Badge.module.scss';
import { useMemo } from 'react';

interface BadgeProps {
  type: 'NEW' | 'TOP' | 'HIT';
  label: string;
  className?: string;
}

export const Badge = memo<BadgeProps>(({ type, label, className = '' }) => {
  const badgeClasses = useMemo(() => 
    `${styles.badge} ${styles[type]} ${className}`, 
    [type, className]
  );

  return (
    <span className={badgeClasses}>
      {label}
    </span>
  );
});

Badge.displayName = 'Badge';