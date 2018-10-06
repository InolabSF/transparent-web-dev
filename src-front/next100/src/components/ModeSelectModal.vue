<template>
  <modal name="hello-world">
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
    </div>
  </modal>
</template>

<script>
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
export default {
  name: "ModeSelectModal",
  mixins: [customTouchEventDriver],
  data() {
    return {
      selectedMode: "production"
    };
  },
  methods: {
    onClickSelectMode() {
      this.$store.commit('set', {
        customTouchMode: this.selectedMode
      });
      this.startObserver();
      this.$modal.hide('hello-world');
    }
  }
}
</script>
