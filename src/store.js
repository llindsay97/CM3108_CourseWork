import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggingIn: false,
    loginError: null,
    loginSuccessful: false,
    accessToken: null
  },
  mutations: {
    loginStart: state => (state.loggingIn = true),
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
      if (state.loginError == null) {
        state.loginSuccessful = true;
      }
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    logout: state => {
      state.accessToken = null;
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit("loginStart");

      axios
        .post("https://reqres.in/api/login", {
          ...loginData
        })
        .then(response => {
          commit("loginStop", null);
          commit("updateAccessToken", response.data.token);
        })
        .catch(error => {
          commit("loginStop", error.response.data.error);
          commit("updateAccessToken", null);
        });
    },
    doLoginSaveAccess({ commit }, loginData) {
      commit("loginStart");

      axios
        .post("https://reqres.in/api/login", {
          ...loginData
        })
        .then(response => {
          localStorage.setItem("accessToken", response.data.token);
          commit("loginStop", null);
          commit("updateAccessToken", response.data.token);
        })
        .catch(error => {
          commit("loginStop", error.response.data.error);
          commit("updateAccessToken", null);
        });
    },
    logout({ commit }) {
      localStorage.removeItem("accessToken");
      commit("logout");
      router.push("/welcome");
    },
    fetchAccessToken({ commit }) {
      commit("updateAccessToken", localStorage.getItem("accessToken"));
    },
    getLoginStatus() {
      return this.state.loginSuccessful;
    }
  }
});
