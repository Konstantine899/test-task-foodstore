import { lazy } from 'react';
import { CartSidebar } from './CartSidebar';

export const CartSidebarAsync = lazy(() => 
  Promise.resolve({ default: CartSidebar })
);
