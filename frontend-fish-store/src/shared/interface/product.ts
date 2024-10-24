export interface Product {
  id: string | number;
  name: string;
  price: string;
  weight: string;
  units: number;
  description: string;
  images: string[];
  category_id: string | number;
  created_at: Date;
  updated_at?: Date;
}
