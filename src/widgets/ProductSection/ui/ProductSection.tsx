// src/widgets/product-section/ui/ProductSection.tsx
import React, { memo } from 'react';
import * as styles from './ProductSection.module.scss';
import { CategoryNavigation } from '@/widgets/CategoryNavigation';
import { ProductGrid } from '@/widgets/ProductGrid';

interface ProductSectionProps {
  isCartOpen: boolean;
}

export const ProductSection = memo<ProductSectionProps>(({ isCartOpen }) => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>Суши и роллы</h2>
        <CategoryNavigation isCartOpen={isCartOpen} />
      </header>
      
      <main className={`${styles.content} ${isCartOpen ? styles.cartOpen : ''}`}>
        <ProductGrid isCartOpen={isCartOpen} />
      </main>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';