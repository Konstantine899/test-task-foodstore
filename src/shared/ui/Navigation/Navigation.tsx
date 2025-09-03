import React from 'react';
import * as styles from './Navigation.module.scss';

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ items, className = '' }) => {
  return (
    <nav className={`${styles.navigation} ${className}`}>
      <ul className={styles.navList}>
        {items.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <a href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};