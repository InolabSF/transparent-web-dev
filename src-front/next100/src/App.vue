<template>
  <div id="app">
    <router-view></router-view>
    <mode-select-modal></mode-select-modal>
    <!--<debug-control></debug-control>-->
  </div>
</template>

<script>
import ModeSelectModal from "@/components/ModeSelectModal";
import DebugControl from "@/components/DebugControl";

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
  },
  methods: {
    showSettingModal () {
      this.$modal.show('hello-world');
    }
  }
}
</script>

<style lang="css">
  #app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
  }

  .fill {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
