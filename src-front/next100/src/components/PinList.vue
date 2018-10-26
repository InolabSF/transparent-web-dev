<template>
  <transition enter-active-class="animated fadeIn faster">
    <div class="overlay">
      <div
        v-for="(user, i) in loginUsers"
        :key="i"
        :class="`user-${getDirectionMap()[user.floorId]} user-box`"
        :data-color="getColorMap()[user.floorId]"
      >
        <div class="pin-img-list-container">
          <div class="pin-img-list-wrapper">
            <div class="pin-img-list-slide">
              <ul class="pin-img-list">
                <li
                  v-for="(pin, i) in user.pinnedContents"
                  :key="i"
                  class="item"
                >
                  <div class="media-photo" :style="{ backgroundImage: `url(${pin.img_url})` }">
                    <img src="https://tse1.mm.bing.net/th?id=OIP.YKjBVc2Xt1k57Z91kGx5nQHaKw&amp;pid=Api" class="img">
                    <ul class="pin-list">
                      <!--<li data-color="green"></li>-->
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="qr-link-box">
          <!--<figure class="qr-img"><img src="/next100/staticimg/QR_Code.jpg" alt="QR Code"></figure>-->
          <figure class="qr-img">
            <qrcode-vue class="qrcode" :value="$_wallMixin_getWallLogUrl(user.name)" :size="120" level="H"></qrcode-vue>
          </figure>
          <p class="qr-text">このトークのURL</p>
        </div>
      </div>
      <div class="control-box">
        <div class="btn circle"><a @click="onClose"><img src="/next100/static/img/btn_circle_return01.svg" alt="RETURN"></a></div>
        <div class="btn circle" v-if="isConfirmExit"><a @click="onExit"><img src="/next100/static/img/btn_circle_quit01.svg" alt="QUIT"></a></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import wallMixin from '@/mixins/wallMixin';
import QrcodeVue from 'qrcode.vue';

export default {
  name: "PinList",
  components: {
    QrcodeVue
  },
  mixins: [
    wallMixin
  ],
  methods: {
    onExit() {
      createjs.Sound.play('tap');
      location.href = "/next100";
    },
    getDirectionMap() {
      const directionMap = {
        1: 'bottom',
        2: 'left',
        3: 'top',
        4: 'right'
      };

      return directionMap;
    },
    onClose() {
      createjs.Sound.play('tap_cancel');
      this.$store.commit('setState', {
        isShowPinListModal: false
      });
    }
  },
  computed: {
    ...mapState([
      'loginUsers',
      'isConfirmExit'
    ])
  }
}
</script>

<style lang="scss" scoped>
.qrcode /deep/ canvas {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
