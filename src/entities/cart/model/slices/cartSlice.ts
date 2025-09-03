import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartSchema } from '../types/cartSchema';
import { CartItem } from '../types/cartSchema';

const initialState: CartSchema = {
    total: 0,
    items: [],
    isOpen:false
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
          },
          addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
              existingItem.quantity += action.payload.quantity;
            } else {
              state.items.push(action.payload);
            }
            state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          },
          removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          },
          toggleCart: (state) => {
            state.isOpen = !state.isOpen;
          },
          openCart: (state) => {
            state.isOpen = true;
          },
          closeCart: (state) => {
            state.isOpen = false;
          },
    },
});

export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;