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


  // Получаем название активной категории
  const sectionTitle = useMemo(() => {
    // Если есть поисковый запрос
    if (searchQuery) {
      return `${t('products.searchResults')}: "${searchQuery}"`;
    }
    
    // Если активная категория 'all'
    if (activeCategory === 'all') {
      return t('products.title');
    }
    
    // Иначе название категории
    const category = categories.find(cat => cat.id === activeCategory);
    return category?.label || t('products.title');
  }, [categories, activeCategory, searchQuery]);

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
            Очистить поиск
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