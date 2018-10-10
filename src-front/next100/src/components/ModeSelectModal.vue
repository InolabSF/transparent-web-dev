<template>
  <modal name="hello-world" class="wrapper">
    <div class="p4">
      <label class="block">
        <input type="radio" name="selectedMode" value="production" v-model="selectedMode"> 本番モード（要専用ドライバ）
      </label>
      <label class="block">
        <input type="radio" name="selectedMode" value="preview" v-model="selectedMode"> プレビューモード（Webブラウザ単体で動きます）
      </label>
      <label class="block">
        <input type="radio" name="selectedMode" value="developer" v-model="selectedMode"> 開発者専用モード
      </label>
      <div>
        <button type="submit" @click="onClickSelectMode">OK</button>
      </div>
      <div>
        <small><router-link to="/test-index">モックindex</router-link></small>
      </div>
    </div>
  </modal>
</template>

<script>
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import { mapState } from "vuex";

export default {
  name: "ModeSelectModal",
  mixins: [customTouchEventDriver],
  data() {
    return {
      selectedMode: "production"
    };
  },
  computed: {
    ...mapState(['isModeSelectFinished'])
  },
  methods: {
    onClickSelectMode() {
      this.$store.commit('setState', {
        customTouchMode: this.selectedMode
      });
      this.startObserver();
      this.$store.commit('setState', {
        isModeSelectFinished: true
      });
      this.$modal.hide('hello-world');
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    font-size: 2vw;
  }
</style>
