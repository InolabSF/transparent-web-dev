<template>
  <!-- TODO Three.jsのコンテンツ、DOMの間にまるごとレンダリングする -->
  <div id="homeTarget">home</div>
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
