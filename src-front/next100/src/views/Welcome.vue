<template>
  <div>welcome</div>
</template>

<script>
export default {
  name: "welcome",
  created() {
    window.addEventListener("click", this.onClickStart);
  },
  methods: {
    onClickStart() {
      this.$router.push("/ready");
    }
  }
};
</script>
