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


const AppContent = memo(() => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);

  // Анимация цены: 0 тенге -> 14500 тенге через 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(cartActions.setTotal(14500));
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch]);

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


