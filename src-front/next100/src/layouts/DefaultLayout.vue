<template>
  <div id="app">
    <slot></slot>
  </div>
</template>

<script>
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import { mapState } from "vuex";
import qs from "query-string";

export default {
  name: "DefaultLayout",
  mixins: [customTouchEventDriver],
  created() {
    this.initCustomTouchMode();
  },
  methods: {
    initCustomTouchMode() {
      const modeList = [
        'production',
        'preview',
        'development'
      ];

      // NOTE: this.$route.queryはここでは使えなかったので
      const params = qs.parse(location.search);
      let customTouchMode = params.mode;

      if (!modeList.includes(customTouchMode)) {
        customTouchMode = 'production';
      }
      console.log(customTouchMode);

      this.$store.commit('setState', {
        customTouchMode
      });
      this.startObserver();
    }
  },
}
</script>
