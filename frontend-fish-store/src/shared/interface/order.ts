import {
  OrderPaymentMethod,
  OrderPaymentStatus,
  OrderStatus,
} from '../enums/order';
import { Product } from './product';
import { User } from './user';

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
  product: Product;
}

export interface OrderDetails extends Order {
  order_items: OrderItem[];
  user?: User;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  orders_made: number;
  has_stripe: boolean;
  user_id: number | string | undefined;
}
