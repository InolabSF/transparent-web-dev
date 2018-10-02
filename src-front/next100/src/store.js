import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUsers: []
  },
  mutations: {
    set(state, payload) {
      state = Object.assign(state, payload);
    },
    addLoginUser(state, user) {
      state.loginUsers.push(user);
    },
    removeLoginUser(state, floorId) {
      state.loginUsers = state.loginusers.filter((u) => {
        return u.floorId !== floorId;
      });
    }
  },
  actions: {}
});
