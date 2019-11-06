const state = {
    user: "userhere"
}
const getters = {
    user: state => state.user
}
const mutations = {
    setUser: (state, user) => state.user = user,
    clearUser: state => state.user = ""
}
const actions = {
    loginUser: async ({ commit }, user) => {
        commit("setUser", user);
    },
    registerBuyer: async ({ commit }, user) => {
        commit('setUser', user);
        alert('submited');
    },
    logout: async ({ commit }) => {
        commit("clearUser");
    }

}
export default {
    state,
    getters,
    mutations,
    actions
}