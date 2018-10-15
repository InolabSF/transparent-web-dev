<template>
  <!--<div class="overlay" v-if="isShow" @click.prevent.stop="onClickCloseArea">-->
  <div class="overlay" v-if="isShow">
    <div class="img-detail-box">
      <div class="img-detail-container" :style="style">
        <div class="img-detail-wrapper">
          <div class="left-col">
            <div class="item">
              <div class="media-photo">
                <img :src="content.img_url" class="img">
                <ul class="pin-list" v-if="attachedPins.length > 0">
                  <li :data-color="color" v-for="color in attachedPins" :key="color"></li>
                </ul>
                <button ref="pinButton" class="btn-pin"></button>
              </div>
            </div>
          </div>
          <div class="right-col">
            <h3 class="detail-title">{{ content.title }}</h3>
            <p class="detail-desc">{{ content.desc }}</p>
          </div>
        </div>
        <div class="btn return"><a href="#"><img src="/next100/static/img/btn_return01.svg" alt="RETURN" ref="returnButton"></a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageDetailModal",
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    content: {
      type: Object,
      required: false,
    },
    floorId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      listener: null,

    }
  },
  computed: {
    style() {
      return this.getModalStyleByFloorId(this.floorId)
    },
    attachedPins() {
      let colors = [];
      const contentId = this.content.id;
      this.$store.state.loginUsers.forEach(u => {
        const isPinned = !!u.pinnedContentIds.find(cid => cid === contentId);
        if (isPinned) {
          const color = this.getColorMap()[this.floorId];
          colors.push(color);
        }
      });
      return colors;
    },
  },
  watch: {
    isShow: {
      handler(val, oldVal) {
        if (oldVal === false && val === true) {
          this.startListenCustomTouchStart();
        } else if (oldVal === true && val === false) {
          this.stopListenCustomTouchStart();
        }
      },
      deep: true
    }
  },
  methods: {
    onClickCloseArea() {
      this.onClose();
    },
    startListenCustomTouchStart() {
      this.listener = window.addEventListener('CUSTOM_TOUCH_START', this.onTouchArea);
    },
    stopListenCustomTouchStart() {
      window.removeEventListener('CUSTOM_TOUCH_START', this.listener);
    },
    onTouchArea(evt) {
      const touch = evt.detail[0];
      if (this.isTouchObjectByElement(touch, this.$refs.pinButton)) {
        this.onTouchPinButton(touch);
      } else if (false && this.isTouchObjectByElement(this.$refs.returnButton)) {
        this.onClickCloseArea(touch);
      } else {
        this.onClickCloseArea(touch);
      }
    },
    async onTouchPinButton(touch) {
      const contentId = this.content.id;
      await this.togglePinByFloorId(touch.floorId, contentId);
      // alert("pin button touch by " + touch.floorId);
    },
    onTouchCloseArea(touch) {
      alert("close area touch by " + touch.floorId);
    },
    getModalStyleByFloorId(floorId) {
      const d = this.getTransformDegByFloorId(floorId);
      return { transform: `rotate(${d}deg)` };
    },
    getTransformDegByFloorId(floorId) {
      const map = {
        1: 0,
        2: 90,
        3: 180,
        4: 270
      };

      return map[floorId];
    },
  },
  created() {
    // window.addEventListener('click', () => {
    //   alert("window click");
    // });
  }
}
</script>

<style scoped>

</style>
