import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import * as styles from './Header.module.scss';
import { ActionButton, Icon, SearchDropdown, SearchDirection, LanguageToggle } from '@/shared/ui';
import CartIcon from '@/shared/assets/icons/cart.svg';
import MenuIcon from '@/shared/assets/icons/menu.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';
import { classNames, useTranslation } from '@/shared/lib';
import { productActions } from '@/entities/product';



export const Header = memo(() => {
  const dispatch = useAppDispatch();
  const {isOpen,total} = useAppSelector((state) => state.cart);
  const {products, isLoading} = useAppSelector((state) => state.product);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsExpanded(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleSearchClick = useCallback(() => {
    setShowSearch(!showSearch);
  }, [showSearch]);

  const handleCartClick = useCallback(() => {
    dispatch(cartActions.toggleCart());
  }, [dispatch]);

  const searchItems = useMemo(() => 
    products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price
    })),
    [products]
  );

  const handleSearchSelect = useCallback((item: any) => {
    if (item) {
      dispatch(productActions.searchByText({ query: item.name }));
      setShowSearch(false);
    }
  }, [dispatch]);

  const formattedTotal = useMemo(() => `${total} ₸`, [total]);

  useEffect(() => {
    if (total > 0) {
      setIsPriceAnimating(true);
      const timer = setTimeout(() => setIsPriceAnimating(false), 100);
      return () => clearTimeout(timer);
    }
  }, [total]);

  const menuIcon = useMemo(() => <Icon Svg={MenuIcon} />, []);
  const searchIcon = useMemo(() => <Icon Svg={SearchIcon} />, []);
  const cartIcon = useMemo(() => <Icon Svg={CartIcon} />, []);

  return (
    <header className={classNames(styles.header, { [styles.scrolled]: isExpanded })}>
      <div className={styles.container}>
        <div className={styles.leftActions}>
          <ActionButton 
            icon={menuIcon} 
            ariaLabel={t('common.menu')} 
            disabled={isLoading}
          />
          <LanguageToggle disabled={isLoading} />
          <ActionButton 
            icon={searchIcon} 
            onClick={handleSearchClick} 
            ariaLabel={t('common.search')}
            className={showSearch ? 'active' : ''}
            disabled={isLoading}
          />
        </div>
        
        {showSearch && (
          <div className={styles.searchContainer}>
            <SearchDropdown 
              items={searchItems}
              onSelect={handleSearchSelect}
              direction={SearchDirection.DOWN}
              placeholder={t('products.searchPlaceholder')}
            />
          </div>
        )}
        
        <div className={styles.rightActions}>
          <ActionButton 
            icon={cartIcon} 
            text={formattedTotal} 
            onClick={handleCartClick} 
            ariaLabel={t('common.cart')}
            className={isOpen ? 'cartOpen' : ''}
            isAnimating={isPriceAnimating}
            disabled={isLoading}
          />
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';