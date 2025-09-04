import React from 'react';
import * as styles from './Logo.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={classNames(styles.logo, {}, [className])}>
      <img src={src} alt={alt} className={styles.logoImage} />
    </div>
  );
};