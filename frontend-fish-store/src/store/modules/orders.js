import axios from "axios";

const state = {
    orders: [],
    order_success: 1
}

const getters = {
    orders: state => state.orders,
    orderSuccess: state => state.order_success
}

const mutations = {
    insertOrder: (state, new_order) => state.orders = [new_order, ...state.orders],
    setOrders: (state, orders) => state.orders = orders,
    setOrderSuccess: (state, value) => state.order_success = value,
    updateOrders: (state, updated_order) => {
        const found_order = state.orders.find(order => order.id === updated_order.id);
        if (found_order) {
            found_order.is_delivered = updated_order.is_delivered;
        }
    }
}

const actions = {
    newOrder: async ({ commit, rootState }, order) => {

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

        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.auth.myToken}`
            }
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
    },
    makeOrderSuccess: ({commit}) => commit("setOrderSuccess", 1),
    removeOrderSuccess: ({commit}) => commit("setOrderSuccess", 0),
    setOrderDelivered: async ({ commit, rootState }, order) => {
        return await axios.post(`/order/${order.id}`, {
            is_delivered: order.is_delivered
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.auth.myToken}`
            }
        }).then(res => {
            commit("updateOrders", order);
            return res;
        }).catch(err => err.response)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}