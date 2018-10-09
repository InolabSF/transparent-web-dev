<template>
  <div class="wrapper">
    <h1>touch driver test</h1>
    <div class="message">{{ message }}</div>
    <div class="message">{{ detail }}</div>
    <div class="touchTarget"></div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {
    window.addEventListener('CUSTOM_TOUCH_START', this.onCustomTouchStart);
  },
  data() {
    return {
      message: '',
      detail: '',
    };
  },
  methods: {
    onCustomTouchStart(evt) {
      this.message = 'dispatch custom touch start: ';
      this.detail = JSON.stringify(evt.detail);
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
  font-size: 80px;
}

.touchTarget {
  width: 600px;
  height: 600px;
}
</style>
