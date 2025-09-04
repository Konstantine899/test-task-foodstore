// src/app/App.tsx
import React, { memo, useEffect } from "react";
import * as slc from "./App.module.scss";
import { Header } from "@/widgets/header";
import { CartSidebar } from "@/widgets/CartSidebar";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { ProductSection } from "@/widgets/ProductSection";
import { cartActions } from "@/entities/cart";
import { useAnimatedCounter } from "@/shared/lib";


const AppContent = memo(() => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);

  // Анимированный счетчик для цены корзины
  const { currentValue: animatedTotal } = useAnimatedCounter(14500, {
    duration: 2000, // 2 секунды анимации
    easing: (t) => t * t * (3 - 2 * t), // smoothstep easing
  });

  // Обновляем Redux store с анимированным значением
  useEffect(() => {
    dispatch(cartActions.setTotal(animatedTotal));
  }, [dispatch, animatedTotal]);

  return (
    <div className={slc.app}>
      <Header />
      <main className={slc.main}>
        <ProductSection isCartOpen={isCartOpen} />
      </main>
      <CartSidebar />
    </div>
  );
});

const App = memo(() => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
});

App.displayName = 'App';

export default App;


