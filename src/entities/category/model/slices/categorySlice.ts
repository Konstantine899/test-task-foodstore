import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorySchema } from '../types/categorySchema';

const initialState: CategorySchema = {
    categories: [
        { id: 'baked-rolls', name: 'baked-rolls', label: 'bakedRolls', isActive: false },
        { id: 'philadelphia', name: 'philadelphia', label: 'philadelphia', isActive: false },
        { id: 'cold-rolls', name: 'cold-rolls', label: 'coldRolls', isActive: false },
        { id: 'fried-rolls', name: 'fried-rolls', label: 'friedRolls', isActive: false },
        { id: 'sushi-gunkans', name: 'sushi-gunkans', label: 'sushiGunkans', isActive: false }
      ],
      activeCategory: 'all'
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
      setActiveCategory: (state, action: PayloadAction<string>) => {
        // Сбрасываем активность всех категорий
        state.categories.forEach(category => {
            category.isActive = false;
        });
        
        // Устанавливаем активную категорию
        const category = state.categories.find(cat => cat.id === action.payload);
        if (category) {
            category.isActive = true;
        }
        
        state.activeCategory = action.payload;
    }
      }
});

export const { actions: categoryActions } = categorySlice;
export const { reducer: categoryReducer } = categorySlice;