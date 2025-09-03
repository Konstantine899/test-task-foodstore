// src/app/App.tsx
import React, { memo } from "react";
import * as slc from "./App.module.scss";
import { Header } from "@/widgets/header";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { CartSidebar } from "@/widgets/CartSidebar";

const App = memo(() => {
  return (
    <Provider store={store}>
      <div className={slc.app}>
        <CartSidebar />
        <Header />
      </div>
    </Provider>
  );
});

App.displayName = 'App';

export default App;