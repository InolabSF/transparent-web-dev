<template>
  <div :class="userClass()" :data-color="userColor()">
    <div class="touch-state-box">
      <template v-if="user.isStartTalkModal">
        <p class="state-text">START!</p>
        <figure class="icon-touch"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>
        <div class="btn return" @click="onClickReturn"><a href="#"><img src="/next100/static/img/btn_return01.svg" alt="RETURN"></a></div>
      </template>
      <template v-else-if="isWelcome" >
        <p class="state-text">WELCOME!</p>
      </template>
      <template v-else>
        <p class="state-text">TOUCH!</p>
        <figure class="icon-touch"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>
      </template>
    </div>
    <div class="user-avatar"></div>
    <div class="user-name">{{ user.name }}</div>
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
    }, 1000);
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
    userColor() {
      const colorMap = {
        1: 'green',
        2: 'red',
        3: 'yellow',
        4: 'blue'
      };
      return colorMap[this.user.floorId];
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
    }
  }
}
</script>

<style scoped>

</style>
