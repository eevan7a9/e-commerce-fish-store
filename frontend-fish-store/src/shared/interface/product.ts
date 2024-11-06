export interface Product {
  id: string | number;
  name: string;
  price: number;
  weight: number;
  units: number;
  description: string;
  images?: string[];
  category_id: string | number;
  category_name?: string;
  tags: string[];
  created_at: string;
  updated_at?: string;
}
