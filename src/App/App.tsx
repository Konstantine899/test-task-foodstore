import React from "react";
import * as slc from "./App.module.scss";
import { Header } from "@/widgets/header";
import { Provider } from "react-redux";
import { store } from "@/app/store";

const App = () => {
  return (
    <Provider store={store}>
    <div className={slc.app}>
      <Header />
    </div>
    </Provider>
  );
};

export default App;
