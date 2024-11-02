import { OrderStatus } from '../enums/order';

export interface Order {
  id: string | number;
  user_id?: string | number;
  email: string;
  shipping_address_line1: string;
  shipping_address_line2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip_code?: string;
  shipping_country?: string;
  status: OrderStatus;
  order_items?: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem extends Order {
  id: string | number;
  order_id?: string | number;
  product_id: string | number;
  quantity: number;
  price: string;
  created_at?: string;
  updated_at?: string;
}
