<template>
  <!-- TODO Three.jsのコンテンツ、DOMの間にまるごとレンダリングする -->
  <div class="fill" id="homeTarget" >
    <h3>home</h3>
  </div>
</template>

<script>
export default {
  name: "home",
  created() {
    this.$nextTick(() => {
      const target = document.querySelector("#homeTarget");
      target.addEventListener("click", this.onClickStart);
    });
  },
  methods: {
    onClickStart() {
      this.$router.push("/welcome");
    }
  }
};
</script>
