import router from "./index";
import store from "../store/index";

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if user_token exists
        if (!store.state.auth.myToken) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
        // this route requires visitor, check if not login
        if (store.state.auth.user.role !== 'admin') {
            next({
                path: '/',
            })
        } else {
            next()
        }
    }else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // this route requires visitor, check if not login
        if (store.state.auth.myToken) {
            next({
                path: '/',
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})