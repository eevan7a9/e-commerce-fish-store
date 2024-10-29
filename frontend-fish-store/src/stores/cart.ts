import { defineStore } from 'pinia';
import { Product } from 'src/shared/interface/product';

interface CartItem {
  product: Product;
  quantity: number;
}

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
    addItem(product: Product) {
      const findProduct = this.items.find(
        (item) => item.product.id === product.id
      );
      if (findProduct) {
        return (findProduct.quantity += 1);
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeItem(id: string | number): CartItem | undefined {
      let removed!: CartItem;
      this.items = this.items.filter((item) => {
        if (String(item.product.id) !== String(id)) {
          return item;
        }
        removed = item;
      });
      return removed;
    },
  },
});
