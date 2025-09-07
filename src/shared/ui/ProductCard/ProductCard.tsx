import React, { memo, useCallback, useMemo } from 'react';
import * as styles from './ProductCard.module.scss';
import { Badge } from '../Badge';
import { AppImage } from '../AppImage';
import { ImageErrorFallback } from '../ImageErrorFallback';
import type { Product, ProductBadge } from '@/entities/product';
import {
  classNames,
  useTranslation,
  useTranslatedProducts,
} from '@/shared/lib';

/**
 * Пропсы для компонента ProductCard
 */
interface ProductCardProps {
  /** Объект продукта для отображения */
  product: Product;
  /** Обработчик добавления продукта в корзину */
  onAddToCart?: (productId: string) => void;
  /** CSS класс для стилизации */
  className?: string;
}

/**
 * Карточка продукта с изображением, информацией и кнопкой добавления в корзину
 *
 * Отображает:
 * - Изображение продукта с fallback состояниями
 * - Название и описание продукта
 * - Бейджи (новинка, популярное, etc.)
 * - Цену и кнопку добавления в корзину
 *
 * @component
 * @param props - Пропсы компонента
 * @returns JSX элемент карточки продукта
 *
 * @example
 * ```tsx
 * <ProductCard
 *   product={product}
 *   onAddToCart={handleAddToCart}
 *   className="custom-card"
 * />
 * ```
 */
export const ProductCard = memo<ProductCardProps>(
  ({ product, onAddToCart, className = '' }) => {
    const { t } = useTranslation();
    const translatedProducts = useTranslatedProducts();

    const ImageLoader = useMemo(
      () => (
        <div className={styles['image-loader']}>
          <div className={styles.spinner} />
        </div>
      ),
      [],
    );

    const ImageError = useMemo(
      () => (
        <ImageErrorFallback
          className={styles['image-error']}
          text=""
          imageSrc="/test-task-foodstore/images/no-image.jpg"
        />
      ),
      [],
    );

    const translatedProduct = useMemo(() => {
      return (
        translatedProducts.find((p: Product) => p.id === product.id) || product
      );
    }, [translatedProducts, product]);

    const handleAddToCart = useCallback(() => {
      onAddToCart?.(product.id);
    }, [onAddToCart, product.id]);

    const formattedPrice = useMemo(() => `${product.price} ₸`, [product.price]);

    const cardClasses = useMemo(
      () => classNames(styles.card, {}, [className]),
      [className],
    );

    return (
      <article className={cardClasses}>
        <div className={styles['image-container']}>
          <AppImage
            src={product.image}
            alt={translatedProduct.name}
            className={styles.image}
            lazy={true}
            fallback={ImageLoader}
            errorFallback={ImageError}
          />
          {product.badges && (
            <div className={styles.badges}>
              {product.badges.map((badge: ProductBadge, index: number) => (
                <Badge key={index} type={badge.type} translateLabel={true} />
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
              className={styles['add-button']}
              onClick={handleAddToCart}
              aria-label={t('common.addToCart')}
            >
              +
            </button>
          </div>
        </div>
      </article>
    );
  },
);

ProductCard.displayName = 'ProductCard';
