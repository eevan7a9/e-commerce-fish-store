const state = {
    orders: [
        {
            id: 1,
            product_name: "koi first",
            user_email: "user1@gmail.com",
            quantity: 23,
            address: "somewhere I belong",
            is_delivered: 0,
            created_at: "2019-11-07 19:52:17",
            updated_at: "2019-11-07 19:52:17"
        },
        {
            id: 2,
            product_name: "koi Second",
            user_email: "user2@gmail.com",
            quantity: 13,
            address: "somewhere I belong",
            is_delivered: 1,
            created_at: "2019-11-07 19:52:17",
            updated_at: "2019-11-07 19:52:17"
        },
        {
            id: 3,
            product_name: "koi first",
            user_email: "user2@gmail.com",
            quantity: 10,
            address: "somewhere I belong",
            is_delivered: 0,
            created_at: "2019-11-07 19:52:17",
            updated_at: "2019-11-07 19:52:17"
        }
    ]
}

const getters = {
    orders: state => state.orders
}

const mutations = {
    insertOrder: async (state, new_order) => state.orders = [new_order, ...state.orders]
}

const actions = {
    newOrder: async ({ commit }, order) => {
        commit("insertOrder", order);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}