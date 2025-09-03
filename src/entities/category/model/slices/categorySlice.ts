import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorySchema } from '../types/categorySchema';

const initialState: CategorySchema = {
    categories: [
        { id: 'baked-rolls', name: 'baked-rolls', label: 'Запечённые роллы', isActive: true },
        { id: 'philadelphia', name: 'philadelphia', label: 'Филадельфия', isActive: false },
        { id: 'cold-rolls', name: 'cold-rolls', label: 'Холодные роллы', isActive: false },
        { id: 'fried-rolls', name: 'fried-rolls', label: 'Жареные роллы', isActive: false },
        { id: 'sushi-gunkans', name: 'sushi-gunkans', label: 'Суши и гунканы', isActive: false }
      ],
      activeCategory: 'baked-rolls'
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setActiveCategory: (state, action: PayloadAction<string>) => {
          state.activeCategory = action.payload;
          state.categories = state.categories.map(cat => ({
            ...cat,
            isActive: cat.id === action.payload
          }));
        }
      }
});

export const { actions: categoryActions } = categorySlice;
export const { reducer: categoryReducer } = categorySlice;