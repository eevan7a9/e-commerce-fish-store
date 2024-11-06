import {
  OrderPaymentMethod,
  OrderPaymentStatus,
  OrderStatus,
} from '../enums/order';

export interface Order {
  id: string | number;
  user_id?: string | number;
  name: string;
  email: string;
  phone?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  payment_method_id?: string;
  payment_method: OrderPaymentMethod;
  status: OrderStatus;
  payment_status: OrderPaymentStatus;
  order_items?: OrderItem[];
  total_amount: number;
  total_weight?: number;
  created_at: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string | number;
  order_id?: string | number;
  product_id: string | number;
  quantity: number;
  weight?: number;
  price: number;
  created_at?: string;
  updated_at?: string;
}
