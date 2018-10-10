<template>
  <div class="wrapper">
    <h1>logging test</h1>
    <div class="message">
      <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
    </div>
    <div class="touchTarget"></div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {
    window.addEventListener('CUSTOM_TOUCH_START', this.onCustomTouch);
    window.addEventListener('CUSTOM_TOUCH_END', this.onCustomTouch);
    window.addEventListener('CUSTOM_TOUCH_MOVE', this.onCustomTouch);
  },
  data() {
    return {
      logs: [],
    };
  },
  methods: {
    onCustomTouch(evt) {
      // this.logs.push('dispatch custom touch start: ');
      this.logs.push(JSON.stringify(evt.detail));
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
