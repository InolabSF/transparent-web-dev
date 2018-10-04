<template>
  <div id="app">
    <router-view></router-view>
    <mode-select-modal></mode-select-modal>
  </div>
</template>

<script>
import ModeSelectModal from "@/components/ModeSelectModal";

export default {
  name: "App",
  components: {
    ModeSelectModal
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
