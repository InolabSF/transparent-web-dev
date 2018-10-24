const USER_LIMIT = 4;
import client from "@/core/ApiClient";

export default {
  methods: {
    login(floorId) {
      // TODO ID識別
      // TODO 名前連番
      // const floorId = this.$store.state.loginUsers.length + 1;

      const isExist = !!this.$store.state.loginUsers.find(u => u.floorId === floorId);

      if (isExist) {
        return false;
      }

      const user = {
        floorId: floorId,
        name: `guest100${floorId}`,
        pinnedContents: [],
        isStartTalkModal: false,
        isConfirmTalkEndModal: false,
        lastCustomTouchStartTime: new Date().getTime(),
      };

      if (this.$store.state.loginUsers.length < USER_LIMIT) {
        createjs.Sound.play('login');
        this.$store.commit('addLoginUser', user);
        this.syncLoginUserToLocalStorage();
      } else {
        throw "参加人数は4名まで";
      }
    },
    logout(floorId) {
      this.$store.commit('removeLoginUser', floorId);
      this.syncLoginUserToLocalStorage();
    },
    syncLoginUserToLocalStorage() {
      localStorage.setItem('loginUsers', JSON.stringify(this.$store.state.loginUsers));
    },
    getStyleByFloorId(floorId) {
      const styleMap = {
        1: {bottom: 0, left: 'auto', right: 'auto'},
        2: {bottom: 'auto', left: 0, top: 'auto'},
        3: {top: 0, left: 'auto', right: 'auto'},
        4: {bottom: 'auto', right: 0, top: 'auto'},
      };
      return styleMap[floorId];
    },
    getUserByFloorId(floorId) {
      const user = this.$store.state.loginUsers.find(u => {
        return u.floorId === floorId;
      });
      return user;
    },
    isPinedByFloorId(floorId, contentId) {
      const user = this.getUserByFloorId(floorId);
      return user.pinnedContents.find(c => c.id === contentId);
    },
    togglePinByFloorId(floorId, content) {
      const user = this.getUserByFloorId(floorId);
      const isPinned = this.isPinedByFloorId(floorId, content.id);
      if (isPinned) {
        createjs.Sound.play('tap_cancel');
        this.$store.commit('deletePinByFloorId', {
          floorId,
          contentId: content.id,
        });
        this.deletePinByFloorId(content.id, user.name);
      } else {
        createjs.Sound.play('tap_pin');
        this.$store.commit('addPinByFloorId', {
          floorId,
          content,
        });
        this.postPinByFloorId(content.id, user.name);
      }
    },
    async postPinByFloorId(related_content_id, eventuser_id) {
      const url = '/next100/pins';
      const params = {
        eventuser_id,
        related_content_id,
      };
      const res = await client.post(url, params).catch(() => {
        return false;
      });
      return res ? true : false;
    },
    async deletePinByFloorId(related_content_id, eventuser_id) {
      const url = '/next100/pins';
      const params = {
        data: {
          eventuser_id,
          related_content_id,
        }
      };
      const res = await client.delete(url, params).catch(() => {
        return false;
      });
      return res ? true : false;
    },
    getColorMap() {
      const colorMap = {
        1: 'green',
        2: 'red',
        3: 'yellow',
        4: 'blue'
      };
      return colorMap;
    },
    // updateUserByFloorId(floorId) {
    //   const user = this.getUserByFloorId(floorID);
    //
    //   this.$store.commit('setState', {
    //
    //   });
    // }
  }
}
