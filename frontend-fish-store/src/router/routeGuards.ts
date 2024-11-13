import { useAuthStore } from 'src/stores/auth';
import { useCartStore } from 'src/stores/cart';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export default function beforeEachGuards(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  const cartStore = useCartStore();

  // Check if the user is a Guest
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (authStore.userInfo || authStore.userToken) {
      console.log('redirecting... \nRequires Guests...');
      return next({ path: '/' }); // Redirect to login if not authenticated
    }
  }

  // Check if the user is Authenticated
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.userInfo || !authStore.userToken) {
      console.log('redirecting... \nRequires Authentication...');
      return next({ path: '/auth' }); // Redirect to login if not authenticated
    }
  }

  // Check if the user is customer
  if (to.matched.some((record) => record.meta.customerOnly)) {
    if (authStore.isAdmin) {
      console.log('redirecting... \nRequires Non-Admin...');
      return next({ path: '/admin' }); // Redirect to login if not authenticated
    }
  }

  // Check if the user is an admin
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!authStore?.userInfo?.is_admin) {
      console.log('redirecting... \nRequires Admin...');
      return next({ path: '/' });
    }
  }

  // Check if User has Cart Item
  if (to.matched.some((record) => record.meta.requiresCartItem)) {
    if (!cartStore.list.length) {
      console.log('redirecting... \nRequires Cart Items...');
      return next({ path: '/' });
    }
  }

  next();
}
