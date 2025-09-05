import React from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import * as cls from "./PageLoader.module.scss";
/**
 * Компонент PageLoader отображает анимированный индикатор загрузки страницы.
 *
 * @param isLoading - Флаг для показа/скрытия загрузчика (необязательно).
 * @returns JSX-элемент загрузчика страницы.
 */

const PageLoader = () => {
  return (
    <div className={classNames(cls["lds-roller"])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

// Устанавливаем displayName для отладки
PageLoader.displayName = "PageLoader";

export default PageLoader;
