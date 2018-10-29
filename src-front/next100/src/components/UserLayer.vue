<template>
  <div id="user-layer">
    <transition enter-active-class="animated fadeIn faster">
      <div v-if="isShowUserOverlay" class="user-overlay"></div>
    </transition>
    <user-profile v-for="user in loginUsers" :key="user.floorId" :user="user"></user-profile>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import UserProfile from "@/components/UserProfile";

export default {
  name: "UserLayer",
  components: {
    UserProfile
  },
  data() {
    return {
      isWelcome: true,
    }
  },
  methods: {
  },
  computed: {
    ...mapState([
      'loginUsers'
    ]),
    ...mapGetters([
      'isShowUserOverlay'
    ]),
  }
}
</script>

<style scoped>
#user-layer {
  z-index: 50;
}
.user-overlay {
  background-color: rgba(0,0,0,0.82);
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -2;
}
</style>
