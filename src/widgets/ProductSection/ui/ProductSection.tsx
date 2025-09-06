import React, { memo, useMemo, useCallback } from 'react';
import { classNames, useTranslation } from '@/shared/lib';
import * as styles from './ProductSection.module.scss';
import { CategoryNavigation } from '@/widgets/CategoryNavigation';
import { ProductGrid } from '@/widgets/ProductGrid';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { productActions } from '@/entities/product';
import { TitleSkeleton, ActionButtonSkeleton, CategoryNavigationSkeleton } from '@/shared/ui';



interface ProductSectionProps {
  isCartOpen: boolean;
}

export const ProductSection = memo<ProductSectionProps>(({ isCartOpen }) => {
  const dispatch = useAppDispatch();
  const { activeCategory, categories } = useAppSelector((state) => state.category);
  const { searchQuery, isLoading } = useAppSelector((state) => state.product);
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

  const mods = { [styles['cart-open']]: isCartOpen }
  
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        {isLoading ? (
          <TitleSkeleton width="40%" />
        ) : (
          <h2 className={styles.title}>{sectionTitle}</h2>
        )}
        
        {searchQuery && !isLoading && (
          <button 
            className={styles['clear-search']}
            onClick={handleClearSearch}
          >
            {t('products.clearSearch')}
          </button>
        )}
        
        {searchQuery && isLoading && (
          <ActionButtonSkeleton 
            className={styles['clear-search-skeleton']}
            hasText
          />
        )}
        
        {isLoading ? (
          <CategoryNavigationSkeleton isCartOpen={isCartOpen} />
        ) : (
          <CategoryNavigation isCartOpen={isCartOpen} />
        )}
      </header>
      
      <main className={classNames(styles.content, mods)}>
        <ProductGrid isCartOpen={isCartOpen} />
      </main>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';