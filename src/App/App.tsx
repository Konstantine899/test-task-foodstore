// src/app/App.tsx
import React, { memo, Suspense } from "react";
import * as slc from "./App.module.scss";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { MainPage } from "@/pages";
import '@/shared/lib/i18n';

const App = memo(() => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={slc.app}>
          <MainPage />
        </div>
      </Suspense>
    </Provider>
  );
});

App.displayName = 'App';

export default App;


