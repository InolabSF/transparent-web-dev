<template>
  <div class="debug-control" @touchstart="test">
    <label class="block">
      固定フロアID:
      <select v-model="floorId" @change="onChangeFloorId">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </label>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DebugControl",
  data() {
    return {
      floorId: this.debugParams.currentFloorId
    };
  },
  computed: {
    ...mapState(['debugParams'])
  },
  methods: {
    test(evt) {

    },
    onChangeFloorId() {
      this.$store.commit('setDebugParams', {
        currentFloorId: Number(this.floorId)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.debug-control {
  width: 15vw;
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 10px;
}
</style>
