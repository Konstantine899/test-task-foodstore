// src/widgets/product-grid/ui/ProductGrid.tsx
import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './ProductGrid.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { cartActions } from '@/entities/cart';
import { ProductCard } from '@/shared/ui';

interface ProductGridProps {
  isCartOpen: boolean;
}

export const ProductGrid = memo<ProductGridProps>(({ isCartOpen }) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { activeCategory } = useAppSelector((state) => state.category);

  const filteredProducts = useMemo(() => 
    products.filter(product => product.category === activeCategory),
    [products, activeCategory]
  );

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

  const gridClasses = `${styles.grid} ${isCartOpen ? styles.cartOpen : ''}`;

  return (
    <div className={gridClasses}>
      {filteredProducts.map((product) => (
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