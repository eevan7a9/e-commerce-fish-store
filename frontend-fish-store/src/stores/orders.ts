import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { RequestResponse } from 'src/shared/interface/api';
import { Order, OrderCustomer, OrderItem } from 'src/shared/interface/order';
import { headerOpts } from 'src/shared/utils/requests';

// TEST DATA
import { FormCheckout } from 'src/shared/interface/form';
import { AxiosError } from 'axios';
import { OrderPaymentStatus, OrderStatus } from 'src/shared/enums/order';

interface OrdersState {
  orders: Order[];
  loading: boolean;
  customers: OrderCustomer[];
}

export const useOrdersStore = defineStore('orders', {
  state(): OrdersState {
    return {
      orders: [],
      loading: false,
      customers: [],
    };
  },

  getters: {
    list(): Order[] {
      return this.orders;
    },
    listCustomers(): OrderCustomer[] {
      return this.customers;
    },
  },

  actions: {
    setCustomers(customers: OrderCustomer[]): void {
      this.customers = customers;
    },

    setOrders(orders: Order[]): void {
      this.orders = orders;
    },

    setLoading(val: boolean): void {
      this.loading = val;
    },

    async fetchOrders(token: string): Promise<RequestResponse | void> {
      try {
        this.setLoading(true);
        const { data } = await api.get<RequestResponse<Order[]>>('/orders', {
          headers: headerOpts({ token: token }),
        });
        if (data.status === 200 && data.data) {
          this.setOrders(data.data);
          return { success: true };
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        this.setLoading(false);
      }
    },

    async fetchCustomers(token: string) {
      try {
        this.setLoading(true);
        const { data } = await api.get<RequestResponse<OrderCustomer[]>>(
          '/orders/customers',
          {
            headers: headerOpts({ token: token }),
          }
        );
        if (data.status === 200 && data.data) {
          this.setCustomers(data.data);
          return { success: true };
        }
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      } finally {
        this.setLoading(false);
      }
    },

    async getOrderProducts(
      id: string | number,
      token: string
    ): Promise<RequestResponse<OrderItem[]> | void> {
      try {
        const { data } = await api.get<RequestResponse<OrderItem[]>>(
          `/orders/${id}/products`,
          { headers: headerOpts({ token }) }
        );
        return {
          success: data.status === 200,
          data: data?.data,
          message: data.message,
        };
      } catch (error) {
        if (error instanceof AxiosError) {
          return { success: false, message: error.response?.data.message };
        }
      }
    },

    async updateOrderStatus(
      id: string | number,
      status: OrderStatus | OrderPaymentStatus,
      token: string,
      payment = false
    ): Promise<RequestResponse | void> {
      const statusType = payment ? 'payment_status' : 'status';
      const path = `/orders/${id}/${payment ? 'payment-status' : 'status'}`;
      try {
        const { data } = await api.patch<RequestResponse<Order>>(
          path,
          { [statusType]: status },
          { headers: headerOpts({ token }) }
        );

        if (data.status === 200) {
          const order = this.orders.find((item) => item.id === id);
          if (order) {
            Object.assign(order, data.data);
          }
          return { success: true, message: data.message };
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Failed to Update Order Status', error);
          return { success: false, message: error.response?.data?.message };
        }
      }
    },

    async createOrder(
      form: FormCheckout,
      items: { product_id: string | number; quantity: number }[],
      token: string
    ): Promise<RequestResponse<Order> | void> {
      const myOrder = {
        ...form.contactDetails,
        ...form.shippingAddress,
        payment_method: form.payment.method,
        payment_method_id: form.payment.stripePaymentMethod?.id,
        order_items: items,
      };
      try {
        const { data } = await api.post<RequestResponse<Order>>(
          '/orders',
          myOrder,
          {
            headers: headerOpts({ token }),
          }
        );
        if (data.status === 201) {
          return { success: true, data: data.data, message: data.message };
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error('Failed to create Order', error);
          return { success: false, message: error.response?.data?.message };
        }
      }
    },

    async cancelOrder(
      id: string | number,
      token: string
    ): Promise<RequestResponse | void> {
      try {
        const { data } = await api.post<RequestResponse<Order>>(
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
          console.error('Failed to Cancel Order', error);
          return { success: false, message: error.response?.data?.message };
        }
      }
    },
  },
});
