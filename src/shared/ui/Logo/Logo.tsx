import React from 'react';
import * as styles from './Logo.module.scss';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <img src={src} alt={alt} className={styles.logoImage} />
    </div>
  );
};