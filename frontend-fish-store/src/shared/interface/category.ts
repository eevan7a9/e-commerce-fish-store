import { ProductCategory } from '../enums/product';

export interface Category {
  id: string | number;
  name: ProductCategory;
  description: string;
  imgSrc?: string;
  created_at?: string;
  updated_at?: string;
}
