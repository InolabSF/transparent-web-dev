import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUsers: [],
    isModeSelectFinished: false,
    customTouchMode: "production",
    debugParams: {
      currentFloorId: 1,
    },
    touchingQueues: [],
  },
  mutations: {
    setState(state, payload) {
      state = Object.assign(state, payload);
    },
    addLoginUser(state, user) {
      state.loginUsers.push(user);
    },
    removeLoginUser(state, floorId) {
      state.loginUsers = state.loginusers.filter((u) => {
        return u.floorId !== floorId;
      });
    },
    enqueueTouchingQueue(state, {floorId, time}) {
      state.touchingQueues.push({floorId, time});
    },
    dequeueTouchingQueue(state, {floorId}) {
      state.touchingQueues = state.touchingQueues.filter(d => (
        d.floorId == floorId
      ));
    },
    setDebugParams(state, payload) {
      state.debugParams = Object.assign(state.debugParams, payload);
    }
  },
  actions: {}
});
