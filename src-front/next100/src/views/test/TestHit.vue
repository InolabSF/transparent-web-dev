<template>
  <div class="wrapper">
    <h1>test hit</h1>
    <div class="box" ref="box">
      floorId: {{ floorId }}
    </div>
    <div>{{ message }}</div>
  </div>
</template>

<script>
import customTouchEventDriver from "@/mixins/customTouchEventDriver";

export default {
  name: "TestHit",
  mixins: [customTouchEventDriver],
  data() {
    return {
      message: '',
      floorId: null,
    }
  },
  created() {
    window.addEventListener('CUSTOM_TOUCH_START', this.onTouchStart)
  },
  methods: {
    onTouchStart(evt) {
      const touch = evt.detail[0];
      this.floorId = touch.floorId;
      const box = this.$refs.box;
      if (this.isTouchObjectByElement(touch, box)) {
        this.message = "hit!!!"
      } else {
        this.message = "not hit"
      }
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
  font-size: 2vw;
}

.box {
  width: 25vw;
  height: 25vw;
  background: #f1f1f1;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
}
</style>
