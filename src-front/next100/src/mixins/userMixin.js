const USER_LIMIT = 4;
import client from "@/core/ApiClient";

export default {
  methods: {
    login(floorId) {
      // TODO ID識別
      // TODO 名前連番
      // const floorId = this.$store.state.loginUsers.length + 1;
      const user = {
        floorId: floorId,
        name: `randomName100${floorId}`,
        pinnedContentIds: [],
        isStartTalkModal: false,
      };

      if (this.$store.state.loginUsers.length < USER_LIMIT) {
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
    togglePinByFloorId(floorId, contentId) {
      debugger;
      this.$store.commit('togglePinByFloorId', {
        floorId,
        contentId,
      });
      const user = this.getUserByFloorId(floorId);
      const isPinned = user.pinnedContentIds.find(cid => {
        return cid === contentId;
      });

      if (isPinned) {
        this.deletePinByFloorId(contentId, user.name);
      } else {
        this.postPinByFloorId(contentId, user.name);
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
