// src/pages/MainPage/MainPage.tsx
import React, { memo, useEffect, Suspense, useState } from 'react';
import * as styles from './MainPage.module.scss';
import { Header } from '@/widgets/header';
import { CartSidebarAsync } from '@/widgets/CartSidebar';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { ProductSection } from '@/widgets/ProductSection';
import { cartActions } from '@/entities/cart';
import { productActions } from '@/entities/product/model/slices/productSlice';
import { useAnimatedCounter, classNames } from '@/shared/lib';

/**
 * Главная страница приложения
 *
 * Содержит основную логику приложения:
 * - Управление состоянием загрузки продуктов
 * - Анимацию счетчика корзины
 * - Инициализацию данных корзины
 *
 * @component
 * @returns {JSX.Element} Главная страница с хедером, секцией продуктов и корзиной
 */
const MainPage = memo(() => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { currentValue: animatedTotal } = useAnimatedCounter(
    shouldAnimate ? 14500 : 0,
    {
      duration: 2000,
      easing: (t) => t * t * (3 - 2 * t),
    },
  );

  useEffect(() => {
    dispatch(cartActions.setTotal(0));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setShouldAnimate(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (shouldAnimate) {
      dispatch(cartActions.setTotal(animatedTotal));
    }
  }, [dispatch, animatedTotal, shouldAnimate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(productActions.setLoading(false));
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className={classNames('', { 'cart-open': isCartOpen })}>
      <Header />
      <main className={styles.main}>
        <ProductSection isCartOpen={isCartOpen} />
      </main>
      <Suspense fallback={<div>Загрузка корзины...</div>}>
        <CartSidebarAsync />
      </Suspense>
    </div>
  );
});

MainPage.displayName = 'MainPage';

export default MainPage;
