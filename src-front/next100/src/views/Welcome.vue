<template>
  <div class="fill" @click="onClickStart">welcome</div>
</template>

<script>
export default {
  name: "welcome",
  methods: {
    onClickStart() {
      this.$router.push("/ready");
    }
  }
};
</script>
