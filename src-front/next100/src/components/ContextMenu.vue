<template>
  <div v-if="isLeaveConfirm" class="context-menu leave-table context-menu-wrapper" :style="status.style" :data-color="myColor">
    <p class="state-text sub animated fadeInUp">ARE YOU SURE?</p>
    <div class="leave-img animated zoomIn fast delay-1s"><img src="/next100/static/img/leave-table01.svg" alt="LEAVE TABLE"></div>
    <div class="controls">
      <div class="btn return animated fadeInUp fast delay-2s"><a @click="isLeaveConfirm = false"><img src="/next100/static/img/btn_return01.svg" alt="戻る"></a></div>
      <div class="btn leave animated fadeInUp fast delay-2s"><a @click="onClickLeave"><img src="/next100/static/img/btn_leave01.svg" alt="退席する"></a></div>
    </div>
  </div>
  <div v-else class="context-menu context-menu-wrapper" :style="status.style" :data-color="myColor">
    <div class="btn-close"><a @click="onClickCloseButton"><img src="/next100/static/img/btn_close01.svg" alt="×"></a></div>
    <div class="qr-link-box">
      <figure class="qr-img">
        <!--<img src="/next100/static/img/QR_Code.jpg" alt="QR Code">-->
        <qrcode-vue :value="$_wallMixin_getWallLogUrl(user.name)" :size="120" level="H"></qrcode-vue>
      </figure>
      <p class="qr-text">このトークのURL</p>
    </div>
    <ul class="menu-list">
      <li class="quit">
        <a @click="onClickQuitConfirm">
          <figure class="menu-icon"><img src="/next100/static/img/btn_icon_quit01.svg" alt=""></figure>
          <p>終了する</p>
        </a>
      </li>
      <li class="offreco">
        <a @click="onClickToggleMic">
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
import wallMixin from '@/mixins/wallMixin';

export default {
  name: "ContextMenu",
  components: {
    QrcodeVue
  },
  mixins: [
    wallMixin
  ],
  props: {
    status: {
      type: Object,
      required: true
    },
    onClickPinList: {
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
    };
  },
  methods: {
    onClickToggleMic() {
      const isActive = window.isActive;
      if (isActive) {
        // alert('会話ログの収集を止めます');
        this.$store.commit('setState', {
          isListeningMic: false,
        });
        killMic();
      } else {
        // alert('会話ログの収集を再開します');
        this.$store.commit('setState', {
          isListeningMic: true,
        });
        activateMic();
      }
    },
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
    },
    onClickQuitConfirm() {
      this.onClickCloseButton();
      this.$store.commit('updateLoginUser', {
        floorId: this.status.floorId,
        params: {
          isConfirmTalkEndModal: true
        }
      });
    },
  },
  computed: {
    myColor() {
      return this.getColorMap()[this.status.floorId];
    },
    user() {
      return this.$store.state.loginUsers.find(u => u.floorId === this.status.floorId);
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
.context-menu {
  z-index: 60;
}
</style>
