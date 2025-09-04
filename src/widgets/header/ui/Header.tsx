// src/widgets/header/ui/Header.tsx
import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './Header.module.scss';
import { ActionButton, Icon } from '@/shared/ui';
import CartIcon from '@/shared/assets/icons/cart.svg';
import MenuIcon from '@/shared/assets/icons/menu.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';
import { useState } from 'react';
import { useEffect } from 'react';

export const Header = memo(() => {
  const dispatch = useAppDispatch();
  const {isOpen,total} = useAppSelector((state) => state.cart);
  const [isExpanded, setIsExpanded] = useState(false);

   // Отслеживание скролла
   useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log(scrollY);
      setIsExpanded(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Мемоизированные обработчики
  const handleMenuClick = useCallback(() => {
    console.log('Menu clicked');
  }, []);

  const handleLanguageClick = useCallback(() => {
    console.log('Language clicked');
  }, []);

  const handleSearchClick = useCallback(() => {
    console.log('Search clicked');
  }, []);

  const handleCartClick = useCallback(() => {
    dispatch(cartActions.toggleCart());
  }, [dispatch]);

  // Мемоизированное значение цены
  const formattedTotal = useMemo(() => `${total} ₸`, [total]);

  // Мемоизированные иконки
  const menuIcon = useMemo(() => <Icon Svg={MenuIcon} />, []);
  const searchIcon = useMemo(() => <Icon Svg={SearchIcon} />, []);
  const cartIcon = useMemo(() => <Icon Svg={CartIcon} />, []);

// Изменить строку 56:
const headerClasses = `${styles.header} ${isExpanded ? styles.scrolled : ''}`;

  return (
    <header className={headerClasses}>
      <div className={styles.container}>
        <div className={styles.leftActions}>
          <ActionButton icon={menuIcon} onClick={handleMenuClick} ariaLabel="Меню" />
          <ActionButton text="RU" onClick={handleLanguageClick} ariaLabel="Выбор языка" />
          <ActionButton icon={searchIcon} onClick={handleSearchClick} ariaLabel="Поиск" />
        </div>
        <div className={styles.rightActions}>
          <ActionButton 
            icon={cartIcon} 
            text={formattedTotal} 
            onClick={handleCartClick} 
            ariaLabel="Корзина"
            className={isOpen ? 'cartOpen' : ''}
          />
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';