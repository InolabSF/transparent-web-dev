<template>
  <div>
    <!--<user-layer></user-layer>-->
    <div id="media-send-leyer">
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
    </div>
  </div>
</template>

<script>
import api from "@/core/ApiClient";
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import userMixin from "@/mixins/userMixin";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import UserLayer from "@/components/UserLayer";
import wallMixin from "@/mixins/wallMixin";

export default {
  name: "welcome",
  components: {
    UserLayer
  },
  mixins: [userMixin, customTouchEventDriver, wallMixin],
  data() {
    return {
      isShowConfirmOverlay: false,
    }
  },
  created() {
    window.addEventListener('CUSTOM_TOUCH_START', this.onClickTable);
  },
  methods: {
    onClickTable(evt) {
      const floorId = evt.detail[0].floorId;

      // 外野アラート
      if (floorId === 0) {
        this.$_wallMixin_showOutsideClickAlert();
        return false;
      }

      const user = this.loginUsers.find(u => u.floorId === floorId);
      const isLoggedin = !!user;

      if (false && isLoggedin && user.isStartTalkModal) {
        // NOTE: モーダル内のボタンに移行
        // this.startmeeting();
        // this.$store.commit('updateLoginUser', {
        //   floorId,
        //   params: {
        //     isStartTalkModal: false,
        //   }
        // });
      } else if (isLoggedin) {
        this.confirmStartMeeting(floorId);
      } else {
        this.login(floorId);
      }
    },
    async startmeeting() {
      const res = await this.createWall();
      window.removeEventListener('CUSTOM_TOUCH_START', this.onClickTable);
      const wall = res.data;
      this.$router.push(`/walls/${wall.id}/meeting?key=${res.data.key}`);
      this.$store.commit('setState', { isSmallHue: false });
      this.$store.commit('setState', {
        loginUsers: this.$store.state.loginUsers.map(u => {
          u.isStartTalkModal = false;
          return u;
        })
      });
    },
    confirmStartMeeting(floorId) {
      if (!this.isShowUserOverlay) {
        createjs.Sound.play('hue');
      }
      this.$store.commit('setState', { isSmallHue: true });
      this.$store.commit('updateLoginUser', {
        floorId,
        params: {
          isStartTalkModal: true,
        }
      });
    },
    onClickStartButton() {
      this.startmeeting();
    },
    createWall() {
      const formatedDatetime = moment().format("MMDDHHm");
      const params = {
        name: `NEXT100-${formatedDatetime}`,
        default_langcode: 0,
        version: "next100"
      };
      return api.post("/walls", params);
    }
  },
  computed: {
    ...mapState([
      'loginUsers',
      'isStartTalkModal'
    ]),
    ...mapGetters([
      'isShowUserOverlay'
    ]),
  },
  beforeDestroy() {
    window.removeEventListener('CUSTOM_TOUCH_START', this.onClickTable);
  }
};
</script>

<style lang="scss" scoped>
.user {
  position: absolute;
  font-size: 2vw;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(#000, 0.7);
}
</style>
