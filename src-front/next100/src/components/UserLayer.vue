<template>
  <div id="user-layer">
    <user-profile v-for="user in loginUsers" :key="user.floorId" :user="user"></user-profile>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    ...mapState(['loginUsers'])
  }
}
</script>

<style scoped>
#user-layer {
  z-index: 50;
}
</style>
