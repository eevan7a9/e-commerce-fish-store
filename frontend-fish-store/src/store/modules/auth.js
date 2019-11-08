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
        try {
            const result = await axios.post('/login', {
                email: user.email,
                password: user.password
            });
            commit('setUser', { user: result.data.user, token: result.data.access_token });
            localStorage.setItem("auth", result.data.access_token);
            return "Hello and welcome";
        } catch (error) {
            // console.log(error.response, "error");
            return "Invalid Credentials";
        }
    },
    registerBuyer: async ({ commit }, user) => {
        try {
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
            return "success";
        } catch (error) {
            return error.response;
        }
    },
    logout: async ({ commit, state }) => {
        axios.get('/logout', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${state.myToken}`
            }
        })
            .then(() => {
                localStorage.removeItem("auth");
                commit("clearUser");
            })
            .catch(err => {
                // console.error(err.response);
                alert("Something went wrong", err);
            })

    }

}
export default {
    state,
    getters,
    mutations,
    actions
}