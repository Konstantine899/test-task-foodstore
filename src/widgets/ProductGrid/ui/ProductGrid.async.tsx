import { lazy } from 'react';

export const ProductGridAsync = lazy(() => 
  import('./ProductGrid').then(module => ({
    default: module.ProductGrid
  }))
);