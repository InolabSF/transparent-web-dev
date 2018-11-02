const USER_LIMIT = 4;
import client from "@/core/ApiClient";
import ShortId from 'shortid';
ShortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+*');
import _ from 'lodash';
const COLORS = [
  'green',
  'red',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'orange',
  'pink'
];

export default {
  methods: {
    login(floorId) {
      // 外野は除外
      if (floorId === 0) {
        return false;
      }

      // TODO ID識別
      // TODO 名前連番
      // const floorId = this.$store.state.loginUsers.length + 1;

      const isExist = !!this.$store.state.loginUsers.find(u => u.floorId === floorId);

      if (isExist) {
        return false;
      }

      const user = {
        floorId: floorId,
        name: this.getName(),
        pinnedContents: [],
        isStartTalkModal: false,
        isConfirmTalkEndModal: false,
        lastCustomTouchStartTime: new Date().getTime(),
      };

      if (this.$store.state.loginUsers.length < USER_LIMIT) {
        createjs.Sound.play('login');
        this.$store.commit('addLoginUser', user);
      } else {
        throw "参加人数は4名まで";
      }
    },
    logout(floorId) {
      this.$store.commit('removeLoginUser', floorId);
    },
    getName() {
      const uuid = ShortId.generate();
      const existColors = this.$store.state.loginUsers.map(u => this.getColorByName(u.name));
      const enableColors = COLORS.filter(c => !existColors.includes(c));
      const color = enableColors[_.random(enableColors.length - 1)]
      const name = `${uuid}-${color}`;
      return name;
    },
    getColorByName(name) {
      const splitted = name.split('-');
      if (splitted.length <= 1) {
        return 'red';
      } else {
        return splitted[1];
      }
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
