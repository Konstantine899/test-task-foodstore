// src/widgets/product-section/ui/ProductSection.tsx
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as styles from './ProductSection.module.scss';
import { CategoryNavigation } from '@/widgets/CategoryNavigation';
import { ProductGrid } from '@/widgets/ProductGrid';

interface ProductSectionProps {
  isCartOpen: boolean;
}

export const ProductSection = memo<ProductSectionProps>(({ isCartOpen }) => {

  const mods = { [styles.cartOpen]: isCartOpen }
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>Суши и роллы</h2>
        <CategoryNavigation isCartOpen={isCartOpen} />
      </header>
      
      <main className={classNames(styles.content, mods )}>
        <ProductGrid isCartOpen={isCartOpen} />
      </main>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';