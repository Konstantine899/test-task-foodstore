// src/widgets/category-navigation/ui/CategoryNavigation.tsx
import React, { memo, useCallback } from 'react';
import { classNames, useTranslation } from '@/shared/lib';
import * as styles from './CategoryNavigation.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { categoryActions } from '@/entities/category';
import { productActions } from '@/entities/product';

interface CategoryNavigationProps {
  isCartOpen: boolean;
}

export const CategoryNavigation = memo<CategoryNavigationProps>(({ isCartOpen }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { t } = useTranslation();

  const getCategoryLabel = useCallback((categoryId: string) => {
    const categoryMap: Record<string, string> = {
      'baked-rolls': t('navigation.bakedRolls'),
      'philadelphia': t('navigation.philadelphia'),
      'cold-rolls': t('navigation.coldRolls'),
      'fried-rolls': t('navigation.friedRolls'),
      'sushi-gunkans': t('navigation.sushiGunkans')
    };
    return categoryMap[categoryId] || categoryId;
  }, [t]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    dispatch(categoryActions.setActiveCategory(categoryId));
    // Очищаем поиск при смене категории
    dispatch(productActions.clearSearch());
  }, [dispatch]);

  const mods = { [styles.cartOpen]: isCartOpen }


  return (
    <nav className={styles.navigation}>
      <ul className={ classNames(styles.list, mods)}>
        {categories.map((category) => (
          <li key={category.id} className={styles.item}>
            <button
              className={classNames(styles.button, { [styles.active]: category.isActive })}
              onClick={() => handleCategoryClick(category.id)}
            >
              {getCategoryLabel(category.id)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

CategoryNavigation.displayName = 'CategoryNavigation';