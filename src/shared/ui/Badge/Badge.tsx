// src/shared/ui/Badge/Badge.tsx
import React, { memo } from 'react';
import * as styles from './Badge.module.scss';
import { useMemo } from 'react';
import { useTranslation } from '@/shared/lib/hooks/useTranslation';


interface BadgeProps {
  type: 'NEW' | 'TOP' | 'HIT';
  label?: string;
  className?: string;
  translateLabel?: boolean;
}

export const Badge = memo<BadgeProps>(({ type, label, className = '', translateLabel = false }) => {
  
  const { t } = useTranslation();

  const badgeClasses = useMemo(() => 
    `${styles.badge} ${styles[type]} ${className}`, 
    [type, className]
  );

  const displayLabel = useMemo(() => {
    if (translateLabel) {
      return t(`badges.${type.toLowerCase()}`);
    }
    return label || t(`badges.${type.toLowerCase()}`);
  }, [translateLabel, type, label, t]);


  return (
    <span className={badgeClasses}>
      {displayLabel}
    </span>
  );
});

Badge.displayName = 'Badge';