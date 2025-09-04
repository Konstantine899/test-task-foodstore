import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductSchema } from '../types/productSchema';
import { Product } from '../types/productSchema';

const initialState: ProductSchema = {
    products: [
        // ЗАПЕЧЁННЫЕ РОЛЛЫ
        {
          id: '1',
          name: 'Поцелуй Гейши',
          description: 'Лосось, рис, лава соус, огурец, зеленый лук',
          price: 1200,
          image: '/images/geisha-kiss.jpg',
          badges: [{ type: 'NEW', label: 'НОВИНКА' }],
          category: 'baked-rolls'
        },
        {
          id: '2',
          name: 'Филадельфия запечённая',
          description: 'Запечённый лосось, сыр Филадельфия, жареный лук',
          price: 1100,
          image: '/images/philadelphia-baked.jpg',
          badges: [{ type: 'HIT', label: 'ХИТ' }],
          category: 'baked-rolls'
        },
        {
          id: '3',
          name: 'Канада запечённая',
          description: 'Угорь, огурец, сыр Филадельфия, соус лава',
          price: 1300,
          image: '/images/canada-baked.jpg',
          badges: [{ type: 'TOP', label: 'ТОП' }],
          category: 'baked-rolls'
        },
        {
          id: '4',
          name: 'Аляска запечённая с курицей',
          description: 'Курица, огурец, соус лава, унаги соус, кунжут',
          price: 1000,
          image: '/images/alaska-chicken.jpg',
          badges: [{ type: 'HIT', label: 'ХИТ' }],
          category: 'baked-rolls'
        },

        // ФИЛАДЕЛЬФИЯ
        {
          id: '5',
          name: 'Филадельфия классическая',
          description: 'Лосось, сыр Филадельфия, огурец, нори',
          price: 950,
          image: '/images/philadelphia-classic.jpg',
          badges: [{ type: 'HIT', label: 'ХИТ' }],
          category: 'philadelphia'
        },
        {
          id: '6',
          name: 'Филадельфия с угрем',
          description: 'Угорь, сыр Филадельфия, огурец, унаги соус',
          price: 1150,
          image: '/images/philadelphia-eel.jpg',
          badges: [{ type: 'NEW', label: 'НОВИНКА' }],
          category: 'philadelphia'
        },
        {
          id: '7',
          name: 'Филадельфия с креветкой',
          description: 'Креветка, сыр Филадельфия, авокадо, огурец',
          price: 1050,
          image: '/images/philadelphia-shrimp.jpg',
          badges: [],
          category: 'philadelphia'
        },
        {
          id: '8',
          name: 'Филадельфия с лососем',
          description: 'Свежий лосось, сыр Филадельфия, огурец, кунжут',
          price: 980,
          image: '/images/philadelphia-salmon.jpg',
          badges: [{ type: 'TOP', label: 'ТОП' }],
          category: 'philadelphia'
        },

        // ХОЛОДНЫЕ РОЛЛЫ
        {
          id: '9',
          name: 'Калифорния',
          description: 'Краб, авокадо, огурец, икра тобико, кунжут',
          price: 800,
          image: '/images/california.jpg',
          badges: [{ type: 'HIT', label: 'ХИТ' }],
          category: 'cold-rolls'
        },
        {
          id: '10',
          name: 'Дракон',
          description: 'Угорь, огурец, авокадо, унаги соус, кунжут',
          price: 1200,
          image: '/images/dragon.jpg',
          badges: [{ type: 'TOP', label: 'ТОП' }],
          category: 'cold-rolls'
        },
        {
          id: '11',
          name: 'Аляска',
          description: 'Лосось, огурец, авокадо, икра тобико',
          price: 900,
          image: '/images/alaska.jpg',
          badges: [],
          category: 'cold-rolls'
        },
        {
          id: '12',
          name: 'Бостон',
          description: 'Лосось, огурец, авокадо, икра тобико, кунжут',
          price: 850,
          image: '/images/boston.jpg',
          badges: [{ type: 'NEW', label: 'НОВИНКА' }],
          category: 'cold-rolls'
        },

        // ЖАРЕНЫЕ РОЛЛЫ
        {
          id: '13',
          name: 'Темпура ролл',
          description: 'Лосось, огурец, авокадо в темпуре, соус спайси',
          price: 1100,
          image: '/images/tempura-roll.jpg',
          badges: [{ type: 'NEW', label: 'НОВИНКА' }],
          category: 'fried-rolls'
        },
        {
          id: '14',
          name: 'Криспи ролл',
          description: 'Креветка, огурец, авокадо в хрустящей панировке',
          price: 1000,
          image: '/images/crispy-roll.jpg',
          badges: [],
          category: 'fried-rolls'
        },
        {
          id: '15',
          name: 'Темпура с угрем',
          description: 'Угорь, огурец, авокадо в темпуре, унаги соус',
          price: 1250,
          image: '/images/tempura-eel.jpg',
          badges: [{ type: 'HIT', label: 'ХИТ' }],
          category: 'fried-rolls'
        },

        // СУШИ И ГУНКАНЫ
        {
          id: '16',
          name: 'Суши с лососем',
          description: 'Свежий лосось, рис, нори, васаби',
          price: 150,
          image: '/images/salmon-sushi.jpg',
          badges: [{ type: 'HIT', label: 'ХИТ' }],
          category: 'sushi-gunkans'
        },
        {
          id: '17',
          name: 'Гункан с угрем',
          description: 'Угорь, рис, нори, унаги соус, кунжут',
          price: 200,
          image: '/images/eel-gunkan.jpg',
          badges: [],
          category: 'sushi-gunkans'
        },
        {
          id: '18',
          name: 'Суши с тунцом',
          description: 'Свежий тунец, рис, нори, васаби',
          price: 180,
          image: '/images/tuna-sushi.jpg',
          badges: [{ type: 'NEW', label: 'НОВИНКА' }],
          category: 'sushi-gunkans'
        },
        {
          id: '19',
          name: 'Гункан с креветкой',
          description: 'Креветка, рис, нори, спайси соус, кунжут',
          price: 170,
          image: '/images/shrimp-gunkan.jpg',
          badges: [],
          category: 'sushi-gunkans'
        },
        {
          id: '20',
          name: 'Суши с угрем',
          description: 'Угорь, рис, нори, унаги соус',
          price: 190,
          image: '/images/eel-sushi.jpg',
          badges: [{ type: 'TOP', label: 'ТОП' }],
          category: 'sushi-gunkans'
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