// src/app/App.tsx
import React, { memo, useEffect, Suspense, useState } from "react";
import * as slc from "./App.module.scss";
import { Header } from "@/widgets/header";
import { CartSidebarAsync } from "@/widgets/CartSidebar";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { ProductSection } from "@/widgets/ProductSection";
import { cartActions } from "@/entities/cart";
import { productActions } from "@/entities/product/model/slices/productSlice";
import { useAnimatedCounter } from "@/shared/lib";
import '@/shared/lib/i18n';


const AppContent = memo(() => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { currentValue: animatedTotal } = useAnimatedCounter(shouldAnimate ? 14500 : 0, {
    duration: 2000,
    easing: (t) => t * t * (3 - 2 * t),
  });

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
    <div className={slc.app}>
      <Header />
      <main className={slc.main}>
        <ProductSection isCartOpen={isCartOpen} />
      </main>
      <Suspense fallback={<div>Загрузка корзины...</div>}>
        <CartSidebarAsync />
      </Suspense>
    </div>
  );
});

const App = memo(() => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppContent />
      </Suspense>
    </Provider>
  );
});

App.displayName = 'App';

export default App;


