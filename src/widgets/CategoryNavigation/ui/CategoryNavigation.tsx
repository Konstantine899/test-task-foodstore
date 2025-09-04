// src/widgets/category-navigation/ui/CategoryNavigation.tsx
import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as styles from './CategoryNavigation.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { categoryActions } from '@/entities/category';

interface CategoryNavigationProps {
  isCartOpen: boolean;
}

export const CategoryNavigation = memo<CategoryNavigationProps>(({ isCartOpen }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  const handleCategoryClick = useCallback((categoryId: string) => {
    dispatch(categoryActions.setActiveCategory(categoryId));
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
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

CategoryNavigation.displayName = 'CategoryNavigation';