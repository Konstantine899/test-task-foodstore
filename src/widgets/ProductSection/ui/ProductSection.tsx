import React, { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as styles from './ProductSection.module.scss';
import { CategoryNavigation } from '@/widgets/CategoryNavigation';
import { ProductGrid } from '@/widgets/ProductGrid';
import { useAppSelector } from '@/app/store/hooks';

interface ProductSectionProps {
  isCartOpen: boolean;
}

export const ProductSection = memo<ProductSectionProps>(({ isCartOpen }) => {
  const { activeCategory, categories } = useAppSelector((state) => state.category);

  // Получаем название активной категории
  const sectionTitle = useMemo(() => {
    if (activeCategory === 'all') {
      return 'Суши и роллы';
    }
    const category = categories.find(cat => cat.id === activeCategory);
    return category?.label || 'Суши и роллы';
  }, [categories, activeCategory]);

  const mods = { [styles.cartOpen]: isCartOpen }
  
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        <CategoryNavigation isCartOpen={isCartOpen} />
      </header>
      
      <main className={classNames(styles.content, mods)}>
        <ProductGrid isCartOpen={isCartOpen} />
      </main>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';