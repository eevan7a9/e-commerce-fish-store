import axios from "axios";

const state = {
    orders: []
}

const getters = {
    orders: state => state.orders
}

const mutations = {
    insertOrder: (state, new_order) => state.orders = [new_order, ...state.orders],
    setOrders: (state, orders) => state.orders = orders 
}

const actions = {
    newOrder: async ({ commit }, order) => {

        return axios.post('/order', {
            token: order.token,
            items: order.items,
            email: order.email,
            phone: order.phone,
            address: order.address,
            country: order.country,
            city: order.city,
            state: order.state,
            postal_code: order.postal_code,
            last4: order.last4,
            payment_method: order.payment_method

        }).then((res) => {
            commit("insertOrder", res);
            return res

        }).catch(err => {
            return err.response
        })
    },
    getOrders: async ({ commit, rootState }) => {
        axios.get('/order', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.auth.myToken}`
            }
        }).then(res => {
            commit("setOrders", res.data);
        }).catch(err => {
            alert(err);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}