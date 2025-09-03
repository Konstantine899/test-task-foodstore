// src/entities/product/model/types/productSchema.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    badges?: ProductBadge[];
    category: string;
  }
  
  export interface ProductBadge {
    type: 'NEW' | 'TOP' | 'HIT';
    label: string;
  }
  
  export interface ProductSchema {
    products: Product[];
    isLoading: boolean;
    error?: string;
  }