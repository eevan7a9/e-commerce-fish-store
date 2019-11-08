import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
    component: () => import("../views/Login.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../views/Register.vue")
  },
  {
    path: '/application',
    component: () => import("../views/Application.vue"),
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
        component: () => import("../components/Products/ProductsAdd.vue")
      },
      {
        path: "orders",
        name: 'application.orders',
        component: () => import("../components/Orders/OrdersTable.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
