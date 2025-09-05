import { useMemo } from 'react';
import { useTranslation } from './useTranslation';
import { useAppSelector } from '@/app/store/hooks';
import { createProducts } from '@/entities/product/data/products';

export const useTranslatedProducts = () => {
  const { t } = useTranslation();
  const { products } = useAppSelector((state) => state.product);

  const translatedProducts = useMemo(() => {
    return createProducts(t);
  }, [t]);

  return translatedProducts;
};
