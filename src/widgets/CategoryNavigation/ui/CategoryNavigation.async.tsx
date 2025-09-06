import { lazy } from 'react';

export const CategoryNavigationAsync = lazy(() =>
  import('./CategoryNavigation').then((module) => ({
    default: module.CategoryNavigation,
  })),
);
