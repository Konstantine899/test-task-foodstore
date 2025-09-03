// src/widgets/header/ui/Header.tsx
import React from 'react';
import * as styles from './Header.module.scss';
import { ActionButton, Icon } from '@/shared/ui';
import CartIcon from '@/shared/assets/icons/cart.svg';
import MenuIcon from '@/shared/assets/icons/menu.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Иконки слева: меню, язык, поиск */}
        <div className={styles.leftActions}>
          <ActionButton
            icon= {<Icon Svg={MenuIcon}/>} 
            onClick={() => console.log('Menu clicked')}
            ariaLabel="Меню"
          />
          
          <ActionButton
            text="RU"
            onClick={() => console.log('Language clicked')}
            ariaLabel="Выбор языка"
          />
          
          <ActionButton
            icon={<Icon Svg={SearchIcon}/>}
            onClick={() => console.log('Search clicked')}
            ariaLabel="Поиск"
          />
        </div>

        {/* Корзина справа с ценой */}
        <div className={styles.rightActions}>
          <ActionButton
            icon= {<Icon Svg={CartIcon}/>} 
            text="14500 ₸"
            onClick={() => console.log('Cart clicked')}
            ariaLabel="Корзина"
          />
        </div>
      </div>
    </header>
  );
};