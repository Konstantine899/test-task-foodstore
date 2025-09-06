import React from 'react';
import * as styles from './Navigation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface NavigationItem {
  label: string | React.ReactNode;
  href: string;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav className={classNames(styles.navigation, {}, [className])}>
      <ul className={styles['nav-list']}>
        {items.map((item, index) => (
          <li key={index} className={styles['nav-item']}>
            <a href={item.href} className={styles['nav-link']}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
