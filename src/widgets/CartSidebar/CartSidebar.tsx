import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './CartSidebar.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';

export const CartSidebar = memo(() => {
  const dispatch = useAppDispatch();
  const { total, isOpen } = useAppSelector((state) => state.cart);

  // Мемоизированный обработчик закрытия
  const handleClose = useCallback(() => {
    dispatch(cartActions.closeCart());
  }, [dispatch]);

  // Мемоизированное значение цены
  const formattedTotal = useMemo(() => `${total} ₸`, [total]);

  // Мемоизированные классы
  const sidebarClasses = useMemo(() => 
    `${styles.sidebar} ${isOpen ? styles.open : ''}`, 
    [isOpen]
  );

  return (
    <aside 
      className={sidebarClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
        <header className={styles.header}>
          <h2 id="cart-title" className={styles.title}>
            Мой заказ
          </h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Закрыть корзину"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        
        <main className={styles.content}>
          {/* Вкладки доставки */}
          <div className={styles.deliveryTabs}>
            <button className={`${styles.tab} ${styles.active}`}>Доставка</button>
            <button className={styles.tab}>Самовывоз</button>
          </div>
          
          {/* Адрес доставки */}
          <div className={styles.address}>
            <span className={styles.locationIcon}>📍</span>
            <span>улица Владимира Радостовц...</span>
          </div>
          
          {/* Товары в корзине */}
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemInfo}>
                <h4>Сет «Алматы» - 40 шт</h4>
                <div className={styles.itemPrice}>13500 ₸</div>
              </div>
              <div className={styles.quantityControls}>
                <button className={styles.quantityBtn}>-</button>
                <span className={styles.quantity}>1</span>
                <button className={styles.quantityBtn}>+</button>
              </div>
            </div>
          </div>
          
          {/* Промокод */}
          <div className={styles.promoCode}>
            <label>Промокод</label>
            <input type="text" placeholder="Введите промокод" />
          </div>
        </main>
        
        <footer className={styles.footer}>
          <div className={styles.orderDetails}>
            <div className={styles.detailRow}>
              <span>Товары в заказе 1 шт.</span>
              <span>13500 ₸</span>
            </div>
            <div className={styles.detailRow}>
              <span>Доставка</span>
              <span>1000 ₸</span>
            </div>
          </div>
          <div className={styles.total}>
            <span className={styles.totalLabel}>Итого:</span>
            <span className={styles.totalPrice}>{formattedTotal}</span>
          </div>
        </footer>
    </aside>
  );
});

CartSidebar.displayName = 'CartSidebar';