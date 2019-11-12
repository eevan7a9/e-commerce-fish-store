const state = {
    cart: []
}
const getters = {
    cart: state => state.cart
}
const mutations = {
    insertToCart: (state, product) => {
        state.cart = [product, ...state.cart]
    }
}
const actions = {
    addToCart: async ({ commit }, product) => {
        commit("insertToCart", product);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}