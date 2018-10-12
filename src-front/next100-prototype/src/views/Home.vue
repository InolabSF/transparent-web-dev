<template>
  <!-- TODO Three.jsのコンテンツ、DOMの間にまるごとレンダリングする -->
  <div class="fill">
    <div class="fill" id="homeTarget">
      <h1>TOUCH<br>AND<br>TALK</h1>
    </div>
  </div>
</template>

<script>
import userMixin from "@/mixins/userMixin";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";

export default {
  name: "home",
  mixins: [userMixin, customTouchEventDriver],
  created() {
    this.$nextTick(() => {
      const target = document.querySelector("#homeTarget");
      target.addEventListener("click", this.onTouchStart);
      // this.listenOnceCustomTouchStart(this.onCustomTouchStart);
    });
  },
  methods: {
    onCustomTouchStart(evt) {
      // const floorId = evt.detail.floorId;
      // this.login(floorId);
      this.$router.push("/welcome");
    },
    onTouchStart() {
      this.$router.push("/welcome");
    }
  }
};
</script>
