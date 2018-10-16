<template>
  <div id="app">
    <router-view v-if="isModeSelectFinished || !isShowModeSelectModal"></router-view>
    <mode-select-modal v-if="isShowModeSelectModal"></mode-select-modal>
    <!--<debug-control></debug-control>-->
  </div>
</template>

<script>
import ModeSelectModal from "@/components/ModeSelectModal";
import DebugControl from "@/components/DebugControl";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    ModeSelectModal,
    DebugControl
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
