import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// NOTE: 会議画面だけログイン情報を維持
const isMeetingPage = location.pathname.indexOf('meeting') !== -1;
let defaultLoginUsers;

if (isMeetingPage) {
  const loginIUsersStringFromLS = localStorage.getItem('loginUsers');
  const loginUsersFromLS = loginIUsersStringFromLS ? JSON.parse(loginIUsersStringFromLS) : [];
  // const res = !!loginIUsersStringFromLS && confirm(`前回のログイン状態を復元しますか？\n${loginUsersFromLS.map(u => `電極${u.floorId}: ${u.name}`).join('\n')}`);
  // defaultLoginUsers = res ? loginUsersFromLS : [];
  defaultLoginUsers = loginUsersFromLS;
  // if (!res) {
  //   localStorage.removeItem('loginUsers');
  // }
}

export default new Vuex.Store({
  state: {
    loginUsers: defaultLoginUsers || [],
    isModeSelectFinished: false,
    customTouchMode: "production",
    debugParams: {
      currentFloorId: 1,
    },
    touchingQueues: [],
    isStartTalkModal: false,
    isSmallHue: false,
    isListeningMic: true,
    isConfirmExit: false,
    isShowPinListModal: false,
    isShowStepHereText: false,
    isRequestedStartCreateWall: false,
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
      }) || {};

      // 参照わたし？
      Object.assign(user, params);
    },
    updateAllLoginUser(state, {params}) {
      state.loginUsers = state.loginUsers.map(u => {
        Object.assign(u, params);
        return u;
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
  actions: {},
  getters: {
    isShowUserOverlay(state) {
      if (state.loginUsers.find(u => u.isConfirmTalkEndModal)) {
        return true;
      }

      if (state.loginUsers.find(u => u.isStartTalkModal)) {
        return true;
      }

      return false;
    }
  }
});
