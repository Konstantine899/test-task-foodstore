import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './ProductCard.module.scss';
import { Badge } from '../Badge';
import type { Product, ProductBadge } from '@/entities/product';
import { classNames, useTranslation, useTranslatedProducts } from '@/shared/lib';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export const ProductCard = memo<ProductCardProps>(({ 
  product, 
  onAddToCart, 
  className = '' 
}) => {
  const { t } = useTranslation();
  const translatedProducts = useTranslatedProducts();
  
  const translatedProduct = useMemo(() => {
    return translatedProducts.find((p: Product) => p.id === product.id) || product;
  }, [translatedProducts, product]);

  const handleAddToCart = useCallback(() => {
    onAddToCart?.(product.id);
  }, [onAddToCart, product.id]);

  const formattedPrice = useMemo(() => `${product.price} ₸`, [product.price]);

  const cardClasses = useMemo(() => classNames(styles.card, {}, [className]), [className]);

  return (
    <article className={cardClasses}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={translatedProduct.name}
          className={styles.image}
        />
        {product.badges && (
          <div className={styles.badges}>
            {product.badges.map((badge: ProductBadge, index: number) => (
              <Badge 
                key={index}
                type={badge.type}
                translateLabel={true}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{translatedProduct.name}</h3>
        <p className={styles.description}>{translatedProduct.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{formattedPrice}</span>
          <button 
            className={styles.addButton}
            onClick={handleAddToCart}
            aria-label={t('common.addToCart')}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';    