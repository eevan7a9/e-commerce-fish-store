import { PaymentMethod } from '@stripe/stripe-js';
import { OrderPaymentMethod } from '../enums/order';

export interface FormContactDetails {
  name: string;
  email: string;
  phone?: string;
}

export interface FormShippingAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface FormCheckoutPayment {
  method: OrderPaymentMethod;
  stripePaymentMethod?: PaymentMethod;
}

export interface FormCheckout {
  contactDetails: FormContactDetails;
  shippingAddress: FormShippingAddress;
  payment: FormCheckoutPayment;
}
