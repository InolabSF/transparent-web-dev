<template>
  <div>
    <div id="webgl" ref="webgl" :class="{'is-end': isPlayingAnimation}"></div>
    <div id="overlay" class="webgl-overlay"></div>
  </div>
</template>

<script>
import userMixin from "@/mixins/userMixin";
import wallMixin from "@/mixins/wallMixin";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import $ from "jquery";

export default {
  name: "home",
  mixins: [userMixin, customTouchEventDriver, wallMixin],
  created() {
    this.$nextTick(() => {
      window.addEventListener('CUSTOM_TOUCH_START', this.onCustomTouchStart);
    });
    this.addScripts();
  },
  data() {
    return {
      isPlayingAnimation: false
    };
  },
  methods: {
    addScripts() {
      const srcs = [
        '/next100/static/js/opening/three.js',
        '/next100/static/js/opening/SVGLoader.js',
        '/next100/static/js/opening/main2.js',
      ];
      srcs.forEach(src => {
        const tag = document.createElement("script");
        tag.setAttribute('src', src);
        $('head').append(tag);
      });

      $(window).trigger('load');
    },
    onCustomTouchStart(evt) {

      const floorId = evt.detail[0].floorId;

      // 外野アラート
      if (floorId === 0) {
        this.$_wallMixin_showOutsideClickAlert();
        return false;
      }

      // ログイン
      this.login(floorId);

      window.removeEventListener('CUSTOM_TOUCH_START', this.onCustomTouchStart);

      this.isPlayingAnimation = true;
      this.$refs.webgl.addEventListener('transitionend', () => {
        this.$router.push("/welcome");
      });
    },
    onTouchStart() {
      this.$router.push("/welcome");
    }
  }
};

</script>

<style lang="scss" scoped>
.webgl-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
