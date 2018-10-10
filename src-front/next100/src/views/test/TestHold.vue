<template>
  <div class="wrapper">
    <h1>action test</h1>
    <div>
      <h1>window長押し</h1>
    </div>
    <div class="message">
      <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
    </div>
    <div class="touchTarget"></div>
  </div>
</template>

<script>
const WAITING_HOLD_SECOND = 1000;
export default {
  name: "Test",
  created() {
    window.addEventListener('CUSTOM_TOUCH_START', this.onCustomTouchStart);
    window.addEventListener('CUSTOM_TOUCH_END', this.onCustomTouchEnd);
    window.addEventListener('CUSTOM_TOUCH_MOVE', this.onCustomTouch);
  },
  data() {
    return {
      logs: [],
      queue: [],
    };
  },
  methods: {
    onCustomTouchStart(evt) {
      // this.logs.push('dispatch custom touch start: ');
      const floorId = evt.detail[0].floorId;
      this.$store.commit('enqueueTouchingQueue', {
        floorId,
        time: new Date().getTime()
      });
      setTimeout(() => {

      });
      // this.logs.push(JSON.stringify(evt.detail));
      // let timeoutId = setTimeout(() => {
      //   // this.$store.commit('dequeueTouchingQueue', {
      //   //   floorId,
      //   //   timeoutId
      //   // });
      //
      // }, WAITING_HOLD_SECOND);


    },
    onCustomTouchEnd(evt) {
      // this.logs.push('dispatch custom touch end: ');
      const floorId = evt.detail[0].floorId;
      if (
        this.$store.state.touchingQueues.filter(d => {
          return d.floorId !== floorId
        }).length > 0) {
        alert('長押し判定です');
        // window.dispatch('CUSTOM_HOLD_EVENT', );
      }

      this.$store.commit('dequeueTouchingQueue', {
        floorId
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.message {
  border: 1px solid #666;
  font-size: 2vw;
  text-align: left;
  overflow: auto;
  height: auto;
  overflow: auto;
}

.touchTarget {
  width: 25vw;
  height: 25vw;
}
</style>
