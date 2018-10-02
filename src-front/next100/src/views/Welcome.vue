<template>
  <div class="fill" @click="onClickTable">
    <h1>welcome</h1>
    <div class="user" v-for="user in loginUsers" :key="user.floorId" :style="getStyleByFloorId(user.floorId)">{{ user.name }}</div>
    <div class="overlay flex-column" v-if="isShowConfirmOverlay" @click="isShowConfirmOverlay != false">
      <h1 style="{color: '#fff'}">ready?</h1>
      <div>
        <button class="button" @click="onClickStartButton">START</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/core/ApiClient";
import moment from "moment";
import { mapState } from "vuex";
import userMixin from "@/mixins/userMixin";

export default {
  name: "welcome",
  mixins: [userMixin],
  data() {
    return {
      isShowConfirmOverlay: false,
    }
  },
  methods: {
    onClickTable() {
      // TODO ここの条件は仮 2回目だったら、ready?モーダルで会議をスタート確認
      try {
        this.login();
      } catch(e) {
        this.confirmStartMeeting();
      }
      // this.$router.push("/ready");
    },
    confirmStartMeeting() {
      this.isShowConfirmOverlay = true;
    },
    async onClickStartButton() {
      const res = await this.createWall();
      const wall = res.data;
      this.$router.push(`/walls/${wall.id}/meeting`);
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
    ...mapState(['loginUsers'])
  }
};
</script>

<style lang="scss" scoped>
.user {
  position: absolute;
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
