import React, { memo, useMemo, useCallback } from 'react';
import { classNames, useTranslation } from '@/shared/lib';
import * as styles from './ProductSection.module.scss';
import { CategoryNavigation } from '@/widgets/CategoryNavigation';
import { ProductGrid } from '@/widgets/ProductGrid';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { productActions } from '@/entities/product';



interface ProductSectionProps {
  isCartOpen: boolean;
}

export const ProductSection = memo<ProductSectionProps>(({ isCartOpen }) => {
  const dispatch = useAppDispatch();
  const { activeCategory, categories } = useAppSelector((state) => state.category);
  const { searchQuery } = useAppSelector((state) => state.product);
  const { t } = useTranslation();


  const sectionTitle = useMemo(() => {
    if (searchQuery) {
      return `${t('products.searchResults')}: "${searchQuery}"`;
    }
    
    if (activeCategory === 'all') {
      return t('products.title');
    }
    const category = categories.find(cat => cat.id === activeCategory);
    if (category) {
      return t(`navigation.${category.label}`);
    }
    return t('products.title');
  }, [categories, activeCategory, searchQuery, t]);

  const handleClearSearch = useCallback(() => {
    dispatch(productActions.clearSearch());
  }, [dispatch]);

  const mods = { [styles.cartOpen]: isCartOpen }
  
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        {searchQuery && (
          <button 
            className={styles.clearSearch}
            onClick={handleClearSearch}
          >
            {t('products.clearSearch')}
          </button>
        )}
        <CategoryNavigation isCartOpen={isCartOpen} />
      </header>
      
      <main className={classNames(styles.content, mods)}>
        <ProductGrid isCartOpen={isCartOpen} />
      </main>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';