<template>
  <div id="app">
    <div :id="$route.name">
      <div
        id="wrapper"
        :class="{'offreco-active': !$store.state.isListeningMic}">
        <slot></slot>
        <div id="hue" :class="{ 'is-small': isSmallHue }"></div>
        <user-layer v-if="$route.name !== 'opening'"></user-layer>
        <!--<step-here-text v-if="isShowStepHereText"></step-here-text>-->
      </div>
    </div>
  </div>
</template>

<script>
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import { mapState } from "vuex";
import qs from "query-string";
import UserLayer from "@/components/UserLayer";
import StepHereText from "@/components/StepHereText";


export default {
  name: "DefaultLayout",
  mixins: [customTouchEventDriver],
  components: {
    UserLayer,
    StepHereText
  },
  created() {
    this.initCustomTouchMode();
    this.initUserSwitchDebugger();
  },
  computed: {
    ...mapState([
      'isSmallHue',
      'isShowStepHereText',
    ]),
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
      if (!customTouchMode && customTouchModeFromLS && customTouchModeFromLS !== 'production' && confirm(`${customTouchModeFromLS}モードで再開しますか？`)) {
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
    },
    initUserSwitchDebugger() {
      const { customTouchMode } = this.$store.state;
      if (customTouchMode === 'preview') {
        window.addEventListener('keydown', evt => {
          const { currentFloorId } = this.$store.state.debugParams;
          if (evt.code === 'ArrowLeft') {
            const afterCurrentFloorId = currentFloorId - 1 >= 0 ? currentFloorId - 1 : 0;
            this.$store.commit('setDebugParams', { currentFloorId: afterCurrentFloorId });
          } else if (evt.code === 'ArrowRight') {
            const afterCurrentFloorId = currentFloorId + 1 <= 4 ? currentFloorId + 1 : 4;
            this.$store.commit('setDebugParams', { currentFloorId: afterCurrentFloorId });
          }
        });
      }
    }
  },
}
</script>
