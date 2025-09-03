import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductSchema } from '../types/productSchema';
import { Product } from '../types/productSchema';

const initialState: ProductSchema = {
    products: [
        {
          id: '1',
          name: 'Поцелуй Гейши',
          description: 'Лосось, рис, лава соус, огурец, зеленый лук',
          price: 1200,
          image: '/images/geisha-kiss.jpg',
          badges: [
            { type: 'NEW', label: 'НОВИНКА' },
            { type: 'TOP', label: 'Топ' }
          ],
          category: 'baked-rolls'
        },
        {
          id: '2',
          name: 'Филадельфия с жареным луком',
          description: 'Запечённый лосось, сыр Филадельфия, жареный лук',
          price: 1100,
          image: '/images/philadelphia-onion.jpg',
          badges: [{ type: 'NEW', label: 'НОВИНКА' }],
          category: 'baked-rolls'
        },
        {
          id: '3',
          name: 'Канада запечённая',
          description: 'Угорь, огурец, сыр Филадельфия, соус лава',
          price: 1300,
          image: '/images/canada-baked.jpg',
          badges: [{ type: 'NEW', label: 'НОВИНКА' }],
          category: 'baked-rolls'
        },
        {
          id: '4',
          name: 'Аляска запечённая с курицей',
          description: 'Курица, огурец, соус лава, унаги соус, кунжут',
          price: 1000,
          image: '/images/alaska-chicken.jpg',
          badges: [
            { type: 'HIT', label: 'Хит' },
            { type: 'TOP', label: 'Топ' }
          ],
          category: 'baked-rolls'
        }
      ],
      isLoading: false,
      error: undefined
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
          state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload;
        }
      }

});

export const { actions: productActions } = productSlice;
export const { reducer: productReducer } = productSlice;