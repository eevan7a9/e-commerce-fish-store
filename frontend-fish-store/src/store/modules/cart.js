const state = {
    cart: JSON.parse(localStorage.getItem('cart_shopping')) || []
}
const getters = {
    cart: state => state.cart
}
const mutations = {
    insertToCart: (state, item) => {
        state.cart = [item, ...state.cart]
    },
    removeCartItem: (state, id) => {
        if (id) {
            state.cart = state.cart.filter(item => item.id != id);
        } else {
            state.cart = [];
        }
    }
}
const actions = {
    addToCart: async ({ commit, state }, item) => {
        const cart_storage = [item, ...state.cart];
        localStorage.setItem('cart_shopping', JSON.stringify(cart_storage)); // we stored cart on localstorage
        const stored_time = new Date().getTime(); // we create time cart was stored
        localStorage.setItem('cart_stored', stored_time);
        commit("insertToCart", item);
    },
    deleteCartItem: async ({ commit }, id) => {
        commit("removeCartItem", id)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}