import React, { memo, useEffect, useState } from 'react';
import { Skeleton } from '@/shared/ui';
import * as styles from './HeaderSkeleton.module.scss';

export const HeaderSkeleton = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className={`${styles.headerSkeleton} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.leftActions}>
          <Skeleton 
            height={isMobile ? 36 : 40} 
            width={isMobile ? 36 : 40} 
            variant="circular"
            animation="pulse"
            className={styles.menuButton}
          />
          
          <Skeleton 
            height={28} 
            width={isMobile ? 50 : 60} 
            variant="rectangular"
            animation="wave"
            className={styles.languageToggle}
          />
          
          <Skeleton 
            height={isMobile ? 36 : 40} 
            width={isMobile ? 36 : 40} 
            variant="circular"
            animation="pulse"
            className={styles.searchButton}
          />
        </div>
        
        <div className={styles.rightActions}>
          <div className={styles.cartSkeleton}>
            <Skeleton 
              height={isMobile ? 36 : 40} 
              width={isMobile ? 36 : 40} 
              variant="circular"
              animation="pulse"
              className={styles.cartIcon}
            />
            <Skeleton 
              height={18} 
              width={isMobile ? 60 : 80} 
              variant="text"
              animation="wave"
              className={styles.cartTotal}
            />
          </div>
        </div>
      </div>
    </header>
  );
});

HeaderSkeleton.displayName = 'HeaderSkeleton';
