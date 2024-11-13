import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ApiResponse, RequestStatus } from 'src/shared/interface/api';
import { Order } from 'src/shared/interface/order';
import { headerOpts } from 'src/shared/utils/requests';

// TEST DATA
import ordersTestData from 'src/assets/data/orders';
import { createMockRequest } from 'src/shared/utils/mock';
import { FormCheckout } from 'src/shared/interface/form';
import { AxiosError } from 'axios';

interface OrdersState {
  orders: Order[];
  loading: boolean;
}

export const useOrdersStore = defineStore('orders', {
  state(): OrdersState {
    return {
      orders: [],
      loading: false,
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

    async fetchOrders(token: string): Promise<RequestStatus | void> {
      try {
        this.loading = true;
        const { data } = await api.get<ApiResponse<Order[]>>('/orders', {
          headers: headerOpts({ token: token }),
        });
        if (data.status === 200 && data.data) {
          this.setOrders(data.data);
          return { success: true };
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        this.loading = false;
      }
    },

    async createOrder(
      form: FormCheckout,
      items: { product_id: string | number; quantity: number }[],
      token: string
    ): Promise<RequestStatus | void> {
      const myOrder = {
        ...form.contactDetails,
        ...form.shippingAddress,
        payment_method: form.payment.method,
        payment_method_id: form.payment.stripePaymentMethod?.id,
        order_items: items,
      };
      try {
        const { data } = await api.post<ApiResponse<Order>>(
          '/orders',
          myOrder,
          {
            headers: headerOpts({ token }),
          }
        );
        if (data.status === 201) {
          console.log('Order Created:', data);
          return { success: true, message: data.message };
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log('Failed to create Order', error);
          return { success: false, message: error.response?.data?.message };
        }
      }
    },

    async cancelOrder(
      id: string | number,
      token: string
    ): Promise<RequestStatus | void> {
      try {
        const { data } = await api.post<ApiResponse<Order>>(
          `/orders/${id}/cancel`,
          {},
          { headers: headerOpts({ token }) }
        );
        if (data.status === 200) {
          const order = this.orders.find((item) => item.id === id);
          if (order) {
            Object.assign(order, data.data);
          }
          return { success: true };
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log('Failed to Cancel Order', error);
          return { success: false, message: error.response?.data?.message };
        }
      }
    },

    /**
     * PROTOTYPING & MOCKING DATA
     */
    async loadMockOrders(): Promise<RequestStatus | void> {
      this.loading = true;
      const orders = await createMockRequest<Order[]>(ordersTestData);
      this.setOrders(orders);
      this.loading = false;
      return { success: true };
    },

    async createMockOrder(): Promise<RequestStatus | void> {
      this.loading = true;
      const res = await createMockRequest(
        {
          success: true,
          message: '🚀 Order placed! Hang tight while we prepare your items.',
        },
        3000
      );
      this.loading = false;
      return res;
    },
  },
});
