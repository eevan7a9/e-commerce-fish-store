const state = {
    user: "userhere"
}
const getters = {
    user: state => state.user
}
const mutations = {
    setUser: (state, user) => state.user = user
}
const actions = {
    loginUser: async ({ commit }, user) => {
        commit("setUser", user);
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}