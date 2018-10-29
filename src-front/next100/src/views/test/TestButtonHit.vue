<template>
  <div class="button-container">
    <div class="title">aタグ あり</div>
    <div class="button-wrapper">
      <div class="btn return animated fadeInUp fast delay-2s"><a @click="onClick"><img src="/next100/static/img/btn_return01.svg" alt="戻る"></a></div>
      <div class="btn leave animated fadeInUp fast delay-2s"><a @click="onClick"><img src="/next100/static/img/btn_leave01.svg" alt="退席する"></a></div>
    </div>

    <div class="title">aタグ なし</div>
    <div class="button-wrapper">
      <div class="btn return animated fadeInUp fast delay-2s" @click="onClick"><img src="/next100/static/img/btn_return01.svg" alt="戻る"></div>
      <div class="btn leave animated fadeInUp fast delay-2s" @click="onClick"><img src="/next100/static/img/btn_leave01.svg" alt="退席する"></div>
    </div>

    <div class="title">aタグ なし touchstart</div>
    <div class="button-wrapper">
      <div class="btn return animated fadeInUp fast delay-2s" @touchstart="onClick"><img src="/next100/static/img/btn_return01.svg" alt="戻る"></div>
      <div class="btn leave animated fadeInUp fast delay-2s" @touchstart="onClick"><img src="/next100/static/img/btn_leave01.svg" alt="退席する"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TestButtonHit",
    methods: {
      onClick() {
        createjs.Sound.play('tap');
        alert("touch!!");
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  .button-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    &:first-child {
      margin-top: 2rem;
    }
  }
  .btn.return {
    margin: 1.5em auto 1.9375em;
  }
  .btn.return img {
    height: 5.375em;
    width: 17.5em;
  }
  .btn.leave {
    margin: 1.5em auto 1.9375em;
  }
  .btn.leave img {
    height: 5.375em;
    width: 17.5em;
  }


</style>
