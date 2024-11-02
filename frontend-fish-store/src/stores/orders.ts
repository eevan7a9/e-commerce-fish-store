import { defineStore } from 'pinia';
import { Order } from 'src/shared/interface/order';

interface OrdersState {
  orders: Order[];
}

export const useOrdersStore = defineStore('orders', {
  state(): OrdersState {
    return {
      orders: [],
    };
  },

  getters: {
    list(): Order[] {
      return this.orders;
    },
  },

  actions: {
    setOrders(orders: Order[]): void {
      this.orders = orders;
    },
  },
});
