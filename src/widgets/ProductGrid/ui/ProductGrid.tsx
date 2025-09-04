// src/widgets/product-grid/ui/ProductGrid.tsx
import React, { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib';
import * as styles from './ProductGrid.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';
import { ProductCard } from '@/shared/ui';

interface ProductGridProps {
  isCartOpen: boolean;
}

export const ProductGrid = memo<ProductGridProps>(({ isCartOpen }) => {
  const dispatch = useAppDispatch();
  const { products, filteredProducts ,searchQuery} = useAppSelector((state) => state.product);
  const { activeCategory } = useAppSelector((state) => state.category);

  const productsToShow = useMemo(() => {
    // Если есть поисковый запрос и отфильтрованные продукты - показываем их
    if (searchQuery && filteredProducts.length > 0) {
      return filteredProducts;
    }
    
    // Если есть поисковый запрос, но нет результатов - показываем пустой массив
    if (searchQuery && filteredProducts.length === 0) {
      return [];
    }
    
    // Если активная категория 'all' - показываем все товары
    if (activeCategory === 'all') {
      return products;
    }
    
    // Иначе показываем продукты по активной категории
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