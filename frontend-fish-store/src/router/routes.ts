import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/CustomerLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'products',
        component: () => import('pages/ProductsPage.vue'),
      },
      {
        path: 'products/:id',
        component: () => import('pages/ProductDetailsPage.vue'),
      },
      {
        path: 'checkout',
        component: () => import('pages/CheckoutPage.vue'),
        meta: { requiresCartItem: true },
      },
      {
        path: 'account',
        component: () => import('pages/ProfilePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
    meta: { customerOnly: true },
  },
  {
    path: '/auth',
    component: () => import('layouts/CustomerAuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/SigninPage.vue'),
        meta: { requiresGuest: true },
      },
      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
        meta: { requiresGuest: true },
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') },
    ],
    meta: { requiresAdmin: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
