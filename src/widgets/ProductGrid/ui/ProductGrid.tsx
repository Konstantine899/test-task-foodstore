// src/widgets/product-grid/ui/ProductGrid.tsx
import React, { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib';
import * as styles from './ProductGrid.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';
import { ProductCard, ProductCardSkeleton } from '@/shared/ui';

interface ProductGridProps {
  isCartOpen: boolean;
}

export const ProductGrid = memo<ProductGridProps>(({ isCartOpen }) => {
  const dispatch = useAppDispatch();
  const { products, filteredProducts, searchQuery, isLoading } = useAppSelector((state) => state.product);
  const { activeCategory } = useAppSelector((state) => state.category);

  const productsToShow = useMemo(() => {
    if (searchQuery && filteredProducts.length > 0) {
      return filteredProducts;
    }
    
    if (searchQuery && filteredProducts.length === 0) {
      return [];
    }
    
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === activeCategory);
  }, [products, filteredProducts, searchQuery, activeCategory]);

  const handleAddToCart = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(cartActions.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }));
    }
  }, [dispatch, products]);

  const mods = { [styles.cartOpen]: isCartOpen }

  // Создаем массив скелетонов для отображения во время загрузки
  const skeletonItems = useMemo(() => 
    Array.from({ length: 8 }, (_, index) => (
      <ProductCardSkeleton key={`skeleton-${index}`} />
    )), []
  );

  // Если идет загрузка, показываем скелетоны
  if (isLoading) {
    return (
      <div className={classNames(styles.grid, mods)}>
        {skeletonItems}
      </div>
    );
  }

  return (
    <div className={classNames(styles.grid, mods)}>
      {productsToShow.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';