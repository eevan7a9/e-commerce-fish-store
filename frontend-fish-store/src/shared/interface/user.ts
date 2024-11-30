import { Order } from './order';

export interface User {
  id: string | number;
  name: string;
  email: string;
  profile_img?: string;
  email_verified_at?: boolean;
  address?: string;
  phone?: string;
  is_admin?: boolean;
  created_at: string;
  updated_at?: string;
  orders_made?: number;
  has_stripe?: boolean;
}

export interface UserDetails extends User {
  orders: Order[];
  has_stripe: boolean;
}
