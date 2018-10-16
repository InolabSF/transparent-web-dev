<template>
  <!--<div class="fill">-->
    <!--<h1>welcome</h1>-->
    <!--<div class="user" v-for="user in loginUsers" :key="user.floorId" :data-floor-id="user.floorId" :style="getStyleByFloorId(user.floorId)">{{ user.name }}</div>-->
    <!--<div class="overlay flex-column" v-if="isShowConfirmOverlay" @click="isShowConfirmOverlay != false">-->
      <!--<h1 style="{color: '#fff'}">ready?</h1>-->
      <!--<div>-->
        <!--<button class="button" @click="onClickStartButton">START</button>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->

  <div id="talk-stand-by">
    <div id="wrapper">
      <div id="hue"></div>
      <user-layer @click="test"></user-layer>
      <div id="media-send-leyer"   @click="test">
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
  </div>
</template>

<script>
import api from "@/core/ApiClient";
import moment from "moment";
import { mapState } from "vuex";
import userMixin from "@/mixins/userMixin";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import UserLayer from "@/components/UserLayer";

export default {
  name: "welcome",
  components: {
    UserLayer
  },
  mixins: [userMixin, customTouchEventDriver],
  data() {
    return {
      customTouchEventListener: null,
      isShowConfirmOverlay: false
    }
  },
  created() {
    this.customTouchEventListener = window.addEventListener('CUSTOM_TOUCH_START', this.onClickTable);
  },
  methods: {
    test() {
      // TODO なぜかuser-layerでクリックイベントが発火しない
      debugger;
    },
    onClickTable(evt) {
      const floorId = evt.detail[0].floorId;
      const user = this.loginUsers.find(u => u.floorId === floorId);
      const isLoggedin = !!user;

      if (isLoggedin && user.isStartTalkModal) {
        this.startmeeting();
      } else if (isLoggedin) {
        this.confirmStartMeeting(floorId);
      } else {
        this.login(floorId);
      }
    },
    async startmeeting() {
      const res = await this.createWall();
      window.removeEventListener('CUSTOM_TOUCH_START', this.customTouchEventListener);
      const wall = res.data;
      this.$router.push(`/walls/${wall.id}/meeting`);
    },
    confirmStartMeeting(floorId) {
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
    ])
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
