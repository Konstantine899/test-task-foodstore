import React from "react";
import * as slc from "./App.module.scss";
import { Header } from "@/widgets/header";

const App = () => {
  return (
    <div className={slc.app}>
      <Header />
    </div>
  );
};

export default App;
