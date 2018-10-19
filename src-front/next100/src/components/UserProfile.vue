<template>
  <div :class="userClass()" :data-color="userColor()">
    <div class="touch-state-box">
      <template v-if="user.isStartTalkModal">
        <p class="state-text animated fadeInUp">START!</p>
        <figure class="icon-touch animated zoomIn fast delay-1s"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>
        <div class="btn return" @click="onClickReturn"><a href="#"><img src="/next100/static/img/btn_return01.svg" alt="RETURN"></a></div>
      </template>
      <template v-else-if="isWelcome">
        <transition
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOut"
        >
          <p class="state-text ">WELCOME!</p>
        </transition>
      </template>
      <template v-else-if="$route.name === 'welcome'">
        <p class="state-text">TOUCH!</p>
        <figure class="icon-touch"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>
      </template>
    </div>
    <div class="user-avatar animated fadeInUp fast delay-1s"></div>
    <div class="user-name animated fadeInUp fast delay-2s">{{ user.name }}</div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isWelcome: true,
    };
  },
  created() {
    setTimeout(() => {
      this.isWelcome = false;
    }, 2000);
  },
  methods: {
    userClass() {
      const direction = this.getDirectionClassByFloorId(this.user.floorId);
      const className = {
        [`user-${direction}`]: true,
        'user-box': true,
      };
      return className;
    },
    getDirectionClassByFloorId() {
      const directionMap = {
        1: 'bottom',
        2: 'left',
        3: 'top',
        4: 'right'
      };
      return directionMap[this.user.floorId];
    },
    onClickReturn() {
      this.$store.commit('updateLoginUser', {
        floorId: this.user.floorId,
        params: {
          isStartTalkModal: false
        }
      });
    },
    userColor() {
      const colorMap = this.getColorMap();
      return colorMap[this.user.floorId];
    },
  }
}
</script>

<style scoped>

</style>
