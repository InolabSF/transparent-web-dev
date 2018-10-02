<template>
  <!-- TODO Three.jsのコンテンツ、DOMの間にまるごとレンダリングする -->
  <div class="fill" id="homeTarget" >
    <h1>TOUCH<br>AND<br>TALK</h1>
  </div>
</template>

<script>
import userMixin from "@/mixins/userMixin";

export default {
  name: "home",
  mixins: [userMixin],
  created() {
    this.$nextTick(() => {
      const target = document.querySelector("#homeTarget");
      target.addEventListener("click", this.onClickStart);
    });
  },
  methods: {
    onClickStart() {
      this.login();
      this.$router.push("/welcome");
    }
  }
};
</script>
