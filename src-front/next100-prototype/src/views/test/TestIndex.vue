<template>
  <div class="wrapper">
    <h1>test index</h1>
    <div>
      <p><router-link to="/test-log">イベント取得確認</router-link></p>
      <p><router-link to="/test-hold">長押し確認</router-link></p>
      <p><router-link to="/test-pinch">ピンチ確認</router-link></p>
      <p><router-link to="/test-scroll">スクロール確認</router-link></p>
    </div>
  </div>
</template>

<script>
const WAITING_HOLD_SECOND = 1000;
export default {
  name: "Test"
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
</style>
