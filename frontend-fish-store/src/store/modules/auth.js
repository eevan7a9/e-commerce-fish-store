import axios from "axios";

const state = {
  user: "userhere",
  myToken: localStorage.getItem("auth") || null,
  usersList: []
};
const getters = {
  user: state => state.user,
  token: state => state.myToken,
  usersList: state => state.usersList
};
const mutations = {
  setUser: (state, { user, token }) => {
    state.user = user;
    state.myToken = token;
  },
  clearUser: state => {
    state.user = "";
    state.myToken = "";
  },
  setUsersList: (state, users) => (state.usersList = users),
  updateUserList: (state, updated_user) => {
    const found_user = state.usersList.find(
      user => user.id === updated_user.id
    );
    if (found_user) {
      found_user.deleted_at = updated_user.deleted_at;
    }
  }
};
const actions = {
  loginUser: async ({ commit }, user) => {
    try {
      const result = await axios.post("/login", {
        email: user.email,
        password: user.password
      });

      commit("setUser", {
        user: result.data.user,
        token: result.data.access_token
      });
      localStorage.setItem("auth", result.data.access_token);
      return result;
    } catch (err) {
      return err.response;
    }
  },
  registerBuyer: async ({ commit }, user) => {
    try {
      let result = await axios.post("/register", {
        name: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.confirm
      });
      // console.log(result);
      commit("setUser", {
        user: result.data.user,
        token: result.data.access_token
      });
      localStorage.setItem("auth", result.data.access_token);
      return "success";
    } catch (error) {
      return error.response;
    }
  },
  logout: async ({ commit, state }) => {
    try {
      const result = await axios.get("/logout", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${state.myToken}`
        }
      });
      localStorage.removeItem("auth");
      commit("clearUser");
      return result;
    } catch (error) {
      localStorage.removeItem("auth");
      commit("clearUser");
      alert("Something went wrong", error);
    }
  },
  getUser: async ({ commit, state, dispatch }) => {
    try {
      const result = await axios.get("/user", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${state.myToken}`
        }
      });
      commit("setUser", {
        user: result.data.user,
        token: state.myToken
      });
    } catch (e) {
      dispatch("logout");
      alert(e);
    }
  },
  getUsersList: async ({ commit, state, dispatch }) => {
    try {
      const result = await axios.get("/user/lists", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${state.myToken}`
        }
      });
      commit("setUsersList", result.data);
      return result; // not included the admin
    } catch (err) {
      dispatch("logout");
      alert(err);
      return err.response;
    }
  },
  deleteUser: async ({ commit, state }, id) => {
    try {
      const result = await axios.post(
        "/user/delete",
        {
          id: id
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${state.myToken}`
          }
        }
      );
      commit("updateUserList", result.data);
    } catch (err) {
      alert(err);
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
