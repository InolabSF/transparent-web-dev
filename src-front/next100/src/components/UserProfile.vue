<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div :class="userClass()" :data-color="userColor()">
      <div class="touch-state-box">
        <template v-if="user.isStartTalkModal">
          <p class="state-text animated fadeInUp">START!</p>
          <figure class="icon-touch animated zoomIn fast delay-1s"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>
          <div class="controls">
            <div class="btn return animated fadeInUp fast delay-2s"><a @click="onClickReturnForStart"><img src="/next100/static/img/btn_return01.svg" alt="戻る"></a></div>
            <div class="btn return animated fadeInUp fast delay-2s"><a @click="onClickStart"><img src="/next100/static/img/btn_start01.svg" alt="始める"></a></div>
          </div>
        </template>
        <template v-else-if="user.isConfirmTalkEndModal">
            <!--<p class="state-text sub animated fadeInUp">ARE YOU SURE?</p>-->
            <!--<p class="state-text animated fadeInUp delay-1s">QUIT TALK</p>-->
            <!--<figure class="icon-touch animated zoomIn fast delay-2s"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>-->
            <!--<div class="btn return animated fadeInUp fast delay-3s"><a href="#"><img src="/next100/static/img/btn_return01.svg" alt="RETURN"></a></div>-->
          <p class="state-text sub animated fadeInUp">ARE YOU SURE?</p>
          <p class="state-text animated fadeInUp delay-1s">QUIT TALK</p>
          <figure class="icon-touch animated zoomIn fast delay-1s"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>
          <div class="controls">
            <div class="btn return animated fadeInUp fast delay-2s"><a @click="onClickReturnForQuit"><img src="/next100/static/img/btn_return01.svg" alt="戻る"></a></div>
            <div class="btn return animated fadeInUp fast delay-2s"><a @click="onClickQuit"><img src="/next100/static/img/btn_quit01.svg" alt="終了する"></a></div>
          </div>
        </template>
        <template v-else-if="isWelcome">
          <transition enter-active-class="animated fadeInUp">
            <p class="state-text" ref="welcome">WELCOME!</p>
          </transition>
        </template>
        <template v-else-if="$route.name === 'welcome'">
          <p class="state-text animated fadeInUp" key="1">TOUCH!</p>
          <figure class="icon-touch animated zoomIn fast delay-1s" key="2"><img src="/next100/static/img/icon-touch01.svg" alt="TOUCH"></figure>
        </template>
      </div>
      <div class="user-avatar animated fadeInUp fast delay-1s"></div>
      <div class="user-name animated fadeInUp fast delay-2s"></div>
    </div>
  </transition>
</template>

<script>
import wallMixin from '@/mixins/wallMixin';
export default {
  name: "UserProfile",
  mixins: [
    wallMixin
  ],
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
    }, 4000);
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
    onClickReturnForStart() {
      this.$store.commit('updateAllLoginUser', {
        params: {
          isStartTalkModal: false
        }
      });
      this.$store.commit('setState', {
        isSmallHue: false
      });
    },
    onClickReturnForQuit() {
      this.$store.commit('updateLoginUser', {
        floorId: this.user.floorId,
        params: {
          isConfirmTalkEndModal: false
        }
      });
    },
    onClickStart() {
      this.$_wallMixin_startMeeting();
    },
    onClickQuit() {
      this.$store.commit('updateAllLoginUser', {
        params: {
          isConfirmTalkEndModal: false
        }
      });

      this.$store.commit('setState', {
        isConfirmExit: true,
        isShowPinListModal: true,
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
