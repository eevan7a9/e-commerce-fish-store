import axios from "axios";

const state = {
    user: "userhere",
    myToken: localStorage.getItem("auth") || null,
    usersList: []
}
const getters = {
    user: state => state.user,
    token: state => state.myToken,
    usersList: state => state.usersList
}
const mutations = {
    setUser: (state, { user, token }) => {
        state.user = user;
        state.myToken = token;
    },
    clearUser: state => {
        state.user = "";
        state.myToken = "";
    },
    setUsersList: (state, users) => state.usersList = users
}
const actions = {
    loginUser: async ({ commit }, user) => {
        return await axios.post('/login', {
            email: user.email,
            password: user.password
        }).then((res) => {
            commit('setUser', { user: res.data.user, token: res.data.access_token });
            localStorage.setItem("auth", res.data.access_token);
            return res;
        }).catch((err) => {
            return err.response;
        });
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
        return await axios.get('/logout', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${state.myToken}`
                }
            })
            .then(res => {
                localStorage.removeItem("auth");
                commit("clearUser");
                return res
            })
            .catch(err => {
                localStorage.removeItem("auth");
                commit("clearUser");
                alert("Something went wrong", err);
            });
    },
    getUser: async ({ commit, state, dispatch }) => {
        try {
            const result = await axios.get('/user', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${state.myToken}`
                }
            });
            commit("setUser", { user: result.data.user, token: state.myToken })
        } catch (e) {
            dispatch('logout');
            alert(e);
        }
    },
    getUsersList: async ({ commit, state, dispatch }) => {
        return axios.get('/user/lists', {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${state.myToken}`
            }
        }).then(res => {
            commit("setUsersList", res.data);
            return res; // not included the admin
        }).catch(err => {
            dispatch('logout');
            alert(err);
            return err.response;
        })
    }

}
export default {
    state,
    getters,
    mutations,
    actions
}