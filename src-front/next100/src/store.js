import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// NOTE: リロード時前のログインユーザーは保持している
const loginIUsersStringFromLS = localStorage.getItem('loginUsers');
const loginUsersFromLS = loginIUsersStringFromLS ? JSON.parse(loginIUsersStringFromLS) : [];

export default new Vuex.Store({
  state: {
    loginUsers: loginUsersFromLS || [],
    isModeSelectFinished: false,
    customTouchMode: "production",
    debugParams: {
      currentFloorId: 1,
    },
    touchingQueues: [],
    isStartTalkModal: false,
  },
  mutations: {
    setState(state, payload) {
      state = Object.assign(state, payload);
    },
    addLoginUser(state, user) {
      state.loginUsers.push(user);
    },
    removeLoginUser(state, floorId) {
      state.loginUsers = state.loginUsers.filter((u) => {
        return u.floorId !== floorId;
      });
    },
    updateLoginUser(state, {floorId, params}) {
      const user = state.loginUsers.find(d => {
        return d.floorId === floorId;
      });

      // 参照わたし？
      Object.assign(user, params);
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
    },
    addPinByFloorId(state, {floorId, content}) {
      state.loginUsers = state.loginUsers.map(u => {
        if (u.floorId === floorId) {
          u.pinnedContents.push(content);
          return u;
        } else {
          return u;
        }
      });
    },
    deletePinByFloorId(state, {floorId, contentId}) {
      state.loginUsers = state.loginUsers.map(u => {
        if (u.floorId === floorId) {
          u.pinnedContents = u.pinnedContents.filter(c => c.id !== contentId);
          return u;
        } else {
          return u;
        }
      });
    }
  },
  actions: {}
});
