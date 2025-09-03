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

  // Мемоизированный обработчик клика по overlay
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Мемоизированное значение цены
  const formattedTotal = useMemo(() => `${total} ₸`, [total]);

  // Мемоизированные классы
  const sidebarClasses = useMemo(() => 
    `${styles.sidebar} ${isOpen ? styles.open : ''}`, 
    [isOpen]
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={sidebarClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <header className={styles.header}>
          <h2 id="cart-title" className={styles.title}>
            Корзина
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
          <div className={styles.emptyState}>
            <p>Корзина пуста</p>
          </div>
        </main>
        
        <footer className={styles.footer}>
          <div className={styles.total}>
            <span className={styles.totalLabel}>Итого:</span>
            <span className={styles.totalPrice}>{formattedTotal}</span>
          </div>
        </footer>
      </aside>
    </>
  );
});

CartSidebar.displayName = 'CartSidebar';