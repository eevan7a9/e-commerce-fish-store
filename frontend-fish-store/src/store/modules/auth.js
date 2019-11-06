import axios from "axios";

const state = {
    user: "userhere",
    myToken: localStorage.getItem("auth") || null,
}
const getters = {
    user: state => state.user,
    token: state => state.myToken
}
const mutations = {
    setUser: (state, { user, token }) => {
        state.user = user;
        state.myToken = token;
    },
    clearUser: state => {
        state.user = "";
        state.myToken = "";
    }
}
const actions = {
    loginUser: async ({ commit }, user) => {
        // axios
        commit("setUser", user);
    },
    registerBuyer: async ({ commit }, user) => {
        let result = await axios
            .post("/register", {
                name: user.username,
                email: user.email,
                password: user.password,
                password_confirmation: user.confirm
            });
        // console.log(result);
        commit('setUser', { user: result.data.user, token: result.data.access_token });
        localStorage.setItem("auth", result.data.access_token);
        alert('submited');
    },
    logout: async ({ commit }) => {
        localStorage.removeItem("auth");
        commit("clearUser");
    }

}
export default {
    state,
    getters,
    mutations,
    actions
}