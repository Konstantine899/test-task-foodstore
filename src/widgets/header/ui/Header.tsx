// src/widgets/header/ui/Header.tsx
import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './Header.module.scss';
import { ActionButton, Icon } from '@/shared/ui';
import CartIcon from '@/shared/assets/icons/cart.svg';
import MenuIcon from '@/shared/assets/icons/menu.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';

export const Header = memo(() => {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.cart.total);

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

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Иконки слева: меню, язык, поиск */}
        <div className={styles.leftActions}>
          <ActionButton
            icon={menuIcon}
            onClick={handleMenuClick}
            ariaLabel="Меню"
          />
          
          <ActionButton
            text="RU"
            onClick={handleLanguageClick}
            ariaLabel="Выбор языка"
          />
          
          <ActionButton
            icon={searchIcon}
            onClick={handleSearchClick}
            ariaLabel="Поиск"
          />
        </div>

        {/* Корзина справа с ценой */}
        <div className={styles.rightActions}>
          <ActionButton
            icon={cartIcon}
            text={formattedTotal}
            onClick={handleCartClick}
            ariaLabel="Корзина"
          />
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';