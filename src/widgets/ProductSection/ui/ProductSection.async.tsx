import { lazy } from 'react';

export const ProductSectionAsync = lazy(() => 
  import('./ProductSection').then(module => ({
    default: module.ProductSection
  }))
);