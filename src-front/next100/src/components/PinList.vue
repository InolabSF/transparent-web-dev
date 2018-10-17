<template>
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
                v-for="(pin, i) in user.pinnedContentIds"
                :key="i"
                class="item"
              >
                <div class="media-photo" data-title="池袋ウエストゲートパーク (文春文庫) | エキサイト商品情報" data-desc="The result by MS Bing Search Image with &quot; 池袋ウエストゲートパーク &quot;" data-id="67468" data-searchid="27073" data-relatedcontentid="509437" style="background-image: url(https://tse1.mm.bing.net/th?id=OIP.YKjBVc2Xt1k57Z91kGx5nQHaKw&amp;pid=Api);">
                  <img src="https://tse1.mm.bing.net/th?id=OIP.YKjBVc2Xt1k57Z91kGx5nQHaKw&amp;pid=Api" class="img">
                  <ul class="pin-list">
                    <li data-color="green"></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="qr-link-box">
        <figure class="qr-img"><img src="/next100/staticimg/QR_Code.jpg" alt="QR Code"></figure>
        <p class="qr-text">このトークのURL</p>
      </div>
    </div>
    <div class="control-box">
      <div class="btn circle"><a @click="onClose"><img src="/next100/static/img/btn_circle_return01.svg" alt="RETURN"></a></div>
      <div class="btn circle" v-if="isConfirmExit"><a @click="onExit"><img src="/next100/static/img/btn_circle_quit01.svg" alt="QUIT"></a></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PinList",
  props: {
    onClose: {
      type: Function,
      required: true
    },
    isConfirmExit: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onExit() {
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
    }
  },
  computed: {
    ...mapState(['loginUsers'])
  }
}
</script>

<style scoped>

</style>
