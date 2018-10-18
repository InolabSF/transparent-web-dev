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

      const customTouchModeFromLS = localStorage.getItem('customTouchMode');
      if (!customTouchMode && customTouchModeFromLS !== 'production' && confirm(`前回のモードを再現しますか？ mode： ${customTouchModeFromLS}`)) {
        customTouchMode = customTouchModeFromLS;
      }

      if (!modeList.includes(customTouchMode)) {
        customTouchMode = 'production';
      }
      console.log('mode:' + customTouchMode);

      this.$store.commit('setState', {
        customTouchMode
      });
      localStorage.setItem('customTouchMode', customTouchMode);
      this.startObserver();
    }
  },
}
</script>
