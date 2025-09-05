// src/widgets/CartSidebar/CartSidebar.tsx
import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './CartSidebar.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';
import { classNames, useTranslation } from '@/shared/lib';

export const CartSidebar = memo(() => {
  const dispatch = useAppDispatch();
  const { total, isOpen } = useAppSelector((state) => state.cart);
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    dispatch(cartActions.closeCart());
  }, [dispatch]);

  const formattedTotal = useMemo(() => `${total} ₸`, [total]);

  const sidebarClasses = useMemo(() => 
    classNames(styles.sidebar, { [styles.open]: isOpen }), 
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
            {t('cart.title')}
          </h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label={t('common.close')}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        
        <main className={styles.content}>
          <div className={styles.deliveryTabs}>
            <button className={classNames(styles.tab, { [styles.active]: true })}>
              {t('cart.delivery')}
            </button>
            <button className={styles.tab}>
              {t('cart.pickup')}
            </button>
          </div>
          
          <div className={styles.address}>
            <span className={styles.locationIcon}>��</span>
            <span>{t('cart.sampleAddress')}</span>
          </div>
          
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemInfo}>
                <h4>{t('cart.sampleItem')}</h4>
                <div className={styles.itemPrice}>{t('cart.sampleItemPrice')}</div>
              </div>
              <div className={styles.quantityControls}>
                <button className={styles.quantityBtn}>-</button>
                <span className={styles.quantity}>1</span>
                <button className={styles.quantityBtn}>+</button>
              </div>
            </div>
          </div>
          
          <div className={styles.promoCode}>
            <label>{t('cart.promoCode')}</label>
            <input type="text" placeholder={t('cart.promoCode')} />
          </div>
        </main>
        
        <footer className={styles.footer}>
          <div className={styles.orderDetails}>
            <div className={styles.detailRow}>
              <span>{t('cart.itemsInOrder', { count: 1 })}</span>
              <span>{t('cart.sampleItemPrice')}</span>
            </div>
            <div className={styles.detailRow}>
              <span>{t('cart.delivery')}</span>
              <span>{t('cart.deliveryCostValue')}</span>
            </div>
          </div>
          <div className={styles.total}>
            <span className={styles.totalLabel}>{t('common.total')}:</span>
            <span className={styles.totalPrice}>{formattedTotal}</span>
          </div>
        </footer>
    </aside>
  );
});

CartSidebar.displayName = 'CartSidebar';