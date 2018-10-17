<template>
  <div v-if="isLeaveConfirm" class="context-menu leave-table context-menu-wrapper" :style="status.style" >
    <p class="state-text sub">ARE YOU SURE?</p>
    <div class="btn leave"><a @click="onClickLeave"><img src="/next100/static/img/btn_leave-table01.svg" alt="LEAVE TABLE"></a></div>
    <div class="btn return"><a @click="isLeaveConfirm = false"><img src="/next100/static/img/btn_return01.svg" alt="RETURN"></a></div>
  </div>
  <div v-else class="context-menu context-menu-wrapper" :style="status.style">
    <div class="btn-close"><a @click="onClickCloseButton"><img src="/next100/static/img/btn_close01.svg" alt="×"></a></div>
    <div class="qr-link-box">
      <figure class="qr-img">
        <!--<img src="/next100/static/img/QR_Code.jpg" alt="QR Code">-->
        <qrcode-vue :value="qrCodeUrl" :size="120" level="H"></qrcode-vue>
      </figure>
      <p class="qr-text">このトークのURL</p>
    </div>
    <ul class="menu-list">
      <li class="quit">
        <a @click="onClickExitMeeting">
          <figure class="menu-icon"><img src="/next100/static/img/btn_icon_quit01.svg" alt=""></figure>
          <p>終了する</p>
        </a>
      </li>
      <li class="offreco">
        <a @click="onClickOffMic">
          <figure class="menu-icon"><img src="/next100/static/img/btn_icon_offreco01.svg" alt=""></figure>
          <p>オフレコ</p>
        </a>
      </li>
      <li class="pins">
        <a @click="onClickPinList">
          <figure class="menu-icon"><img src="/next100/static/img/btn_icon_pins01.svg" alt=""></figure>
          <p>ピン一覧</p>
        </a>
      </li>
      <li class="leave">
        <a @click="isLeaveConfirm = true">
          <figure class="menu-icon"><img src="/next100/static/img/btn_icon_leave01.svg" alt=""></figure>
          <p>退席する</p>
        </a>
      </li>
    </ul>
  </div>  
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: "ContextMenu",
  components: {
    QrcodeVue
  },
  props: {
    status: {
      type: Object,
      required: true
    },
    onClickPinList: {
      type: Function,
      required: true
    },
    onClickExitMeeting: {
      type: Function,
      required: true
    },
    onClickOffMic: {
      type: Function,
      required: true
    },
    onClickCloseButton: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isLeaveConfirm: false,
      qrCodeUrl: location.origin + `/next100/walls/${this.$route.params.wallId}/logs`,
    };
  },
  methods: {
    getTransformDegByFloorId(floorId) {
      const map = {
        1: 0,
        2: 90,
        3: 180,
        4: 270
      };
      return map[floorId];
    },
    onClickLeave() {
      const { floorId } = this.status;
      this.isLeaveConfirm = false;
      this.onClickCloseButton();
      this.logout(floorId);
    }
  }
}
</script>

<style lang="scss" scoped>
.qr-img {
  /deep/ canvas {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
