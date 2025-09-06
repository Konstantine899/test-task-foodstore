// src/entities/category/model/types/categorySchema.ts
export interface Category {
  id: string;
  name: string;
  label: string;
  isActive: boolean;
}

export interface CategorySchema {
  categories: Category[];
  activeCategory: string;
}
