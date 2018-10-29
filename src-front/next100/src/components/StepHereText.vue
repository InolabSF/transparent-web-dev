<template>
  <div class="step-here-text">
    <div class="user-top user-box" data-color="yellow">
      <div class="touch-state-box guide-step-here">
        <p class="state-text animated fadeInUp"><span class="text">STEP</span><span class="arrow">↓</span><span class="text">HERE</span></p>
      </div>
    </div>
    <div class="user-right user-box" data-color="blue">
      <div class="touch-state-box guide-step-here">
        <p class="state-text animated fadeInUp"><span class="text">STEP</span><span class="arrow">↓</span><span class="text">HERE</span></p>
      </div>
    </div>
    <div class="user-bottom user-box touch-active" data-color="green">
      <div class="touch-state-box guide-step-here">
        <p class="state-text animated fadeInUp"><span class="text">STEP</span><span class="arrow">↓</span><span class="text">HERE</span></p>
      </div>
    </div>
    <div class="user-left user-box" data-color="red">
      <div class="touch-state-box guide-step-here">
        <p class="state-text animated fadeInUp"><span class="text">STEP</span><span class="arrow">↓</span><span class="text">HERE</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StepHereText"
  }
</script>

<style scoped>
  .step-here-text {
    z-index: 9999;
  }
</style>
