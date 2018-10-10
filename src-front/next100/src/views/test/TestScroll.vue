<template>
  <div class="wrapper">
    <h1>test index</h1>
    <div class="scroll-wrapper">
      <img class="scroll-child" v-for="i in items" :key="i" src="https://placehold.it/600x600">
    </div>
  </div>
</template>

<script>
import _ from "lodash";
const WAITING_HOLD_SECOND = 1000;
export default {
  name: "TestScroll",
  data() {
    return {
      items: _.range(30)
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

.scroll-wrapper {
  display: flex;
  width: 70vw;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.scroll-child {
  margin-left: 3vw;
  &:first-child {
    margin-left: 0;
  }
}
</style>
