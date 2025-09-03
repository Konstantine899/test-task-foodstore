// src/widgets/header/ui/Header.tsx
import React from 'react';
import * as styles from './Header.module.scss';
import { Logo, Navigation, ActionButton } from '@/shared/ui';

const navigationItems = [
  { label: 'Меню', href: '#' },
  { label: 'Акции', href: '#' },
  { label: 'Контакты', href: '#' },
];

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип слева */}
        <Logo 
          src="/logo.svg" 
          alt="Food Store" 
        />

        {/* Навигационное меню по центру */}
        <Navigation items={navigationItems} />

        {/* Иконки справа */}
        <div className={styles.actions}>
          <ActionButton
            icon="search"
            onClick={() => console.log('Search clicked')}
            ariaLabel="Поиск"
          />
          
          <ActionButton
            text="RU"
            onClick={() => console.log('Language clicked')}
            ariaLabel="Выбор языка"
          />
          
          <ActionButton
            icon="cart"
            badge={0}
            onClick={() => console.log('Cart clicked')}
            ariaLabel="Корзина"
          />
        </div>
      </div>
    </header>
  );
};