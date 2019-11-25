import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/catalog',
    name: 'catalog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Catalog.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/Login.vue"),
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../views/Register.vue"),
    meta: { requiresVisitor: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import("../views/Checkout.vue"),
    props: true,
    meta: { requiresCart: true }
  },
  {
    path: '/checkout/stripe',
    name: 'checkout_stripe',
    component: () => import("../views/CheckoutStripe.vue"),
    meta: { requiresCart: true }
  },
  {
    path: '/checkout/cash',
    name: 'checkout_cash',
    component: () => import("../views/CheckoutCash.vue"),
    meta: { requiresAuthCart: true }
  },    
  {
    path: '/checkout/success',
    name: 'checkout_success',
    component: () => import('../views/CheckoutSuccess.vue'),
    props: true
  },
  {
    path: '/application',
    component: () => import("../views/Application.vue"),
    meta: { requiresAdmin: true },
    children: [
      {
        path: '',
        redirect: { name: 'application.info' }
      },
      {
        path: 'info',
        name: 'application.info',
        component: () => import("../components/Application/ApplicationInfo.vue")
      },
      {
        path: 'products',
        name: 'application.products',
        component: () => import("../components/Products/ProductsTable.vue")
      },
      {
        path: 'products/add',
        name: 'application.products.add',
        component: () => import("../components/Products/ProductsAdd.vue"),
      },
      {
        path: 'products/edit',
        name: 'application.products.edit',
        component: () => import("../components/Products/ProductsAdd.vue"),
        props: true
      },
      {
        path: "orders",
        name: 'application.orders',
        component: () => import("../components/Orders/OrdersTable.vue")
      },
      {
        path: "orders/details",
        name: 'application.orders.details',
        component: () => import("../components/Orders/OrdersDetails.vue"),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
