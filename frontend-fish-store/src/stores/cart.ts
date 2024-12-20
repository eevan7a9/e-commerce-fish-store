import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { CartItem } from 'src/shared/interface/cart';
import { Product } from 'src/shared/interface/product';

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state(): CartState {
    return {
      items: [],
    };
  },
  getters: {
    list(): CartItem[] {
      return this.items;
    },
    total(): number {
      return this.items.reduce((acc, curr) => acc + curr.quantity, 0);
    },
  },
  actions: {
    addItem(product: Product, count = 1): void {
      const findProduct = this.items.find(
        (item) => item.product.id === product.id
      );
      if (findProduct) {
        const total = findProduct.quantity + count;
        findProduct.quantity = total > product.units ? product.units : total;
      } else {
        const quantity = count > product.units ? product.units : count || 1;
        this.items.push({ product, quantity });
      }
      LocalStorage.set('cart', [...this.items]);
    },
    reduceItemCount(id: string | number, count: number): void {
      const item = this.items.find((item) => item.product.id === id);
      if (!item) return;
      if (item?.quantity <= count) {
        this.removeItem(id);
        return;
      }
      item.quantity -= count;
    },
    removeItem(id: string | number): CartItem | undefined {
      let removed!: CartItem;

      this.items = this.items.filter((item) => {
        if (String(item.product.id) !== String(id)) {
          return item;
        }
        removed = item;
      });
      LocalStorage.set('cart', [...this.items]);
      return removed;
    },
    loadItems() {
      this.items = LocalStorage.getItem('cart') || [];
    },
    clear(): void {
      this.items = [];
      LocalStorage.set('cart', []);
    },
  },
});
