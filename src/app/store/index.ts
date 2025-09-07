import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/entities/cart';
import { categoryReducer } from '@/entities/category';
import { productReducer } from '@/entities/product';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
