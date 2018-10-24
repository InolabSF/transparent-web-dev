<template>
  <mobile-layout v-if="$route.meta.layout === 'mobile'">
    <router-view></router-view>
  </mobile-layout>
  <default-layout v-else>
    <router-view></router-view>
  </default-layout>
</template>

<script>
import ModeSelectModal from "@/components/ModeSelectModal";
import DebugControl from "@/components/DebugControl";
import { mapState } from "vuex";
import DefaultLayout from "@/layouts/DefaultLayout";
import MobileLayout from "@/layouts/MobileLayout";

export default {
  name: "App",
  components: {
    DebugControl,
    DefaultLayout,
    MobileLayout
  },
  mounted() {
    this.initSound();
  },
  created() {
    setTimeout(() => {
      this.showSettingModal();
    });

    // NOTE: 長押しでコンテキストメニューが開くのが邪魔なので消す
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    }, false);
  },
  methods: {
    showSettingModal () {
      this.$modal.show('hello-world');
    },
    initSound() {
      createjs.Sound.registerPlugins([
        createjs.HTMLAudioPlugin
      ]);
      createjs.Sound.alternateExtensions = ['mp3'];
      createjs.Sound.registerSound('/next100/static/sounds/tap.mp3', 'tap');
      createjs.Sound.registerSound('/next100/static/sounds/tap_cancel.mp3', 'tap_cancel');
      createjs.Sound.registerSound('/next100/static/sounds/tap_pin.mp3', 'tap_pin');
      createjs.Sound.registerSound('/next100/static/sounds/login.mp3', 'login');
      createjs.Sound.registerSound('/next100/static/sounds/hue.mp3', 'hue');
      createjs.Sound.registerSound('/next100/static/sounds/grid.mp3', 'grid');
    }
  },
}
</script>

<style lang="css">
/*#app {*/
  /*width: 100vw;*/
  /*height: 100vh;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*text-align: center;*/
  /*overflow: hidden;*/
/*}*/

.fill {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
