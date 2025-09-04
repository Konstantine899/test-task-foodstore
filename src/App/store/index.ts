import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/entities/cart';
import { productReducer } from '@/entities/product';
import { categoryReducer } from '@/entities/category';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    category: categoryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;