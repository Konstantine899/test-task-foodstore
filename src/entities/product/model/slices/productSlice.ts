import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductSchema } from '../types/productSchema';
import { Product } from '../types/productSchema';
import { products } from '@/entities/product/data/products';

const initialState: ProductSchema = {
    products: products,
      isLoading: false,
      error: undefined,
      filteredProducts: [],
      searchQuery: '',
      selectedCategory: 'all'
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
        },
        filterBySearch: (state, action: PayloadAction<{ searchItem: any }>) => {
          const { searchItem } = action.payload;
          state.searchQuery = searchItem.name;
          // Ищем все товары, которые содержат название в поиске
          state.filteredProducts = state.products.filter(product => 
              product.name.toLowerCase().includes(searchItem.name.toLowerCase())
          );
      },
      // Новый редьюсер для поиска по тексту
      searchByText: (state, action: PayloadAction<{ query: string }>) => {
        const { query } = action.payload;
        state.searchQuery = query;
        if (query.trim() === '') {
          state.filteredProducts = [];
        } else {
          state.filteredProducts = state.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
          );
        }
      },
      clearSearch: (state) => {
          state.searchQuery = '';
          state.filteredProducts = [];
      },
      setSelectedCategory: (state, action: PayloadAction<string>) => {
          state.selectedCategory = action.payload;
          // Очищаем поиск при смене категории
          state.searchQuery = '';
          state.filteredProducts = [];
      }
      }

});

export const { actions: productActions } = productSlice;
export const { reducer: productReducer } = productSlice;