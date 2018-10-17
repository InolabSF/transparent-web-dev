<template>
  <mobile-layout v-if="$route.meta.layout === 'mobile'">
    <router-view></router-view>
  </mobile-layout>
  <default-layout v-else>
    <router-view v-if="isModeSelectFinished || !isShowModeSelectModal"></router-view>
    <mode-select-modal v-if="isShowModeSelectModal"></mode-select-modal>
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
    ModeSelectModal,
    DebugControl,
    DefaultLayout,
    MobileLayout
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
    }
  },
  computed: {
    ...mapState(['isModeSelectFinished']),
    isShowModeSelectModal() {
      const ignoreRoutes = [
        'wallLogs'
      ];
      if (ignoreRoutes.includes(this.$route.name)) {
        return false;
      }
      return true;
    },
  }
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
