// src/app/App.tsx
import React, { memo, Suspense } from "react";
import * as slc from "./App.module.scss";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { MainPage } from "@/pages";
import '@/shared/lib/i18n';
import { PageLoader } from "@/pages";

const App = memo(() => {
  return (
    <Provider store={store}>
      <Suspense fallback={<PageLoader />}>
        <div className={slc.app}>
          <MainPage />
        </div>
      </Suspense>
    </Provider>
  );
});

App.displayName = 'App';

export default App;


