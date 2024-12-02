export enum OrderStatus {
  Pending = 'pending',
  Approved = 'approved',
  Cancelled = 'cancelled',
  Shipped = 'shipped',
  Received = 'received',
}

export enum OrderPaymentMethod {
  Stripe = 'stripe',
  Cod = 'cod',
}

export enum OrderPaymentStatus {
  Unpaid = 'unpaid',
  Paid = 'paid',
  Refunded = 'refunded',
}
