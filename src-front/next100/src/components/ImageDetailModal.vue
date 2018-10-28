<template>
  <!--<div class="overlay" v-if="isShow" @click.prevent.stop="onClickCloseArea">-->
  <transition
    enter-active-class="animated fadeIn faster"
    enter-leave-class="animated fadeOut faster"
  >
    <div class="overlay" v-if="isShow">
      <div class="img-detail-box">
        <div class="img-detail-container" :style="style">
          <div class="img-detail-wrapper">
            <div class="left-col">
              <div class="item">
                <div class="media-photo">
                  <img :src="content.img_url" class="img">
                  <ul class="pin-list" v-if="attachedPins.length > 0">
                    <li :data-color="color" v-for="(color, i) in attachedPins" :key="i"></li>
                  </ul>
                  <button ref="pinButton" class="btn-pin"></button>
                </div>
              </div>
            </div>
            <div class="right-col">
              <h3 class="detail-title">{{ content.title }}</h3>
              <p class="detail-desc">{{ content.desc }}</p>
              <!--<div class="btn delete"><a @click="onClickDelete"><img src="/next100/static/img/btn_close01.svg" alt=""> <span>DELETE<br>IMAGE</span></a></div>-->
            </div>
          </div>
          <div class="btn return">
            <a @click="onClose"><img src="/next100/static/img/btn_return01.svg" alt="RETURN" ref="returnButton"></a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import client from "@/core/ApiClient";

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
  computed: {
    style() {
      return this.getModalStyleByFloorId(this.floorId)
    },
    attachedPins() {
      let colors = [];
      const contentId = this.content.id;
      this.$store.state.loginUsers.forEach(u => {
        const isPinned = !!u.pinnedContents.find(c => c.id === contentId);
        if (isPinned) {
          const color = this.getColorByName(u.name);
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
    onClickDelete() {
      confirm("この画像を削除します");
      const body = {
        data: {
          related_content_id: this.content.id
        }
      };
      client.delete('/next100/contents', body);
      this.onClose();
    },
    onClickCloseArea() {
      // NOTE 裏のモーダルが開くのを防ぐ
      setTimeout(() => {
        this.onClose();
      }, 0);
    },
    startListenCustomTouchStart() {
      window.addEventListener('CUSTOM_TOUCH_START', this.onTouchArea);
    },
    stopListenCustomTouchStart() {
      window.removeEventListener('CUSTOM_TOUCH_START', this.onTouchArea);
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
      await this.togglePinByFloorId(touch.floorId, this.content);
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
  }
}
</script>

<style lang="scss" scoped>
.img-detail-container {
  transition: all .5s;
}
</style>
