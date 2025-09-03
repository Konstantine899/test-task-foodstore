// src/widgets/header/ui/Header.tsx
import React from 'react';
import * as styles from './Header.module.scss';
import { ActionButton } from '@/shared/ui';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Иконки слева: меню, язык, поиск */}
        <div className={styles.leftActions}>
          <ActionButton
            icon="menu"
            onClick={() => console.log('Menu clicked')}
            ariaLabel="Меню"
          />
          
          <ActionButton
            text="RU"
            onClick={() => console.log('Language clicked')}
            ariaLabel="Выбор языка"
          />
          
          <ActionButton
            icon="search"
            onClick={() => console.log('Search clicked')}
            ariaLabel="Поиск"
          />
        </div>

        {/* Корзина справа с ценой */}
        <div className={styles.rightActions}>
          <ActionButton
            icon="cart"
            text="14500 ₸"
            onClick={() => console.log('Cart clicked')}
            ariaLabel="Корзина"
          />
        </div>
      </div>
    </header>
  );
};