import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorySchema } from '../types/categorySchema';

const getInitialState = (): CategorySchema => {
  const defaultCategories = [
    {
      id: 'baked-rolls',
      name: 'baked-rolls',
      label: 'bakedRolls',
      isActive: false,
    },
    {
      id: 'philadelphia',
      name: 'philadelphia',
      label: 'philadelphia',
      isActive: false,
    },
    {
      id: 'cold-rolls',
      name: 'cold-rolls',
      label: 'coldRolls',
      isActive: false,
    },
    {
      id: 'fried-rolls',
      name: 'fried-rolls',
      label: 'friedRolls',
      isActive: false,
    },
    {
      id: 'sushi-gunkans',
      name: 'sushi-gunkans',
      label: 'sushiGunkans',
      isActive: false,
    },
  ];

  try {
    const savedCategory = localStorage.getItem('activeCategory');

    if (savedCategory) {
      const categories = defaultCategories.map((category) => ({
        ...category,
        isActive: category.id === savedCategory,
      }));

      return {
        categories,
        activeCategory: savedCategory,
      };
    }
  } catch (error) {
    console.error('Error loading activeCategory from localStorage:', error);
  }

  return {
    categories: defaultCategories,
    activeCategory: 'all',
  };
};

const initialState: CategorySchema = getInitialState();

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.categories.forEach((category) => {
        category.isActive = false;
      });
      const category = state.categories.find(
        (cat) => cat.id === action.payload,
      );
      if (category) {
        category.isActive = true;
      }

      state.activeCategory = action.payload;

      try {
        localStorage.setItem('activeCategory', action.payload);
      } catch (error) {
        console.error('Error saving activeCategory to localStorage:', error);
      }
    },
  },
});

export const { actions: categoryActions } = categorySlice;
export const { reducer: categoryReducer } = categorySlice;
