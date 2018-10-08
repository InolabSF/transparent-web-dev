<template>
  <!--<h1>Let's Talk!!</h1>-->
  <!--レイヤーと奥行き表示ロジック-->
  <!--<div>TODO コンテキストメニュー＋QRコード</div>-->
  <!--<div>TODO コンテキスト（leave確認）</div>-->
  <div class="wrapper">
    <div class="layer-list-wrapper">
      <div class="layer-list">
        <div class="layer" :style="getComputedStyleForLayer(i)" v-for="layer, i in layers">
          <div class="layer__word" :style="getRandomStyleForKeyWord()">{{ layer.words[0] }}</div>
          <img class="layer__img" :style="getRandomStyleForImage()" v-for="content, j in layer.related_contents" :key="content.id" :src="content.img_url" @click="onClickImage(content)" />
        </div>
      </div>
    </div>
    <template v-for="stat in contextMenuStatuses">
      <div
        class="context-menu"
        :style="stat.style"
        :ref="stat.refName"
      >
        context menu
      </div>
    </template>
    <template v-if="isShowContentDetailModal">
      <div class="modal is-active">
        <div class="modal-background" @click="isShowContentDetailModal = false"></div>
        <div class="modal-content" v-if="currentDetailModalContent">
          <p class="image is-4by3">
            <img :src="currentDetailModalContent.img_url" alt="">
          </p>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    </template>

  </div>
</template>

<script>
import client from "@/core/ApiClient";
import _ from "lodash";

const START_Z_AXIS = 50; // 先頭z座標
const Z_STEP = 10; // 1レイヤー間のz深度
const SHOW_LAYER_NUM = 10 // 階層数

export default {
  name: "Meeting",
  created() {
    const opts = {
      wallId: this.$route.params.wallId
    };
    startRecognizeSpeachSDK(opts);
    // TODO transcriptsの取得
    this.fetchTranscripts();
    this.listenPersonalTouch();
  },
  data() {
    return {
      layers: [],
      isShowContentDetailModal: false,
      currentContentDetailModalFloor: false,
      contextMenuStatuses: [],
    }
  },
  computed: {

  },
  methods: {
    listenPersonalTouch() {
      window.addEventListener('CUSTOM_TOUCH_START', this.onClickTable);
    },
    isTouchObjectByElement(touch, elm) {
      if (
        touch.x <= elm.offsetLeft + elm.offsetWidth &&
        touch.x >= elm.offsetLeft &&
        touch.y <= elm.offsetTop + elm.offsetHeight &&
        touch.y >= elm.offsetTop
      ) {
        return true;
      } else {
        return false;
      }
    },
    isTouchObjectByRect(touch, {x, y, width, height}) {
      if (
        touch.x <= x + width &&
        touch.x >= x &&
        touch.y <= y + height &&
        touch.y >= y
      ) {
        return true;
      } else {
        return false;
      }
    },
    async fetchTranscripts() {
      const wallId = this.$route.params.wallId;
      const url = `/api/transcripts/${wallId}`;
      const res = await client.get(url);

      // 整形
      const {
        searches,
        search_first_index,
        search_last_index,
        related_contents,
        related_content_last_index
      } = res.data;

      const layers = searches.map(s => {
        s.related_contents = related_contents.filter(r => ( r.transcript_id === s.transcript_id ));
        return s;
      });

      this.layers = layers;
    },
    onClickImage(content) {
      debugger;
      // ID識別で向きを変える
      this.isShowContentDetailModal = true;
      this.currentDetailModalContent = content;
    },
    onClickTable(evt) {
      // TODO 長押しで開く
      const touch = evt.detail[0];
      // NOTE: refsは配列で返ってくる
      const existRef = this.$refs[`context-menu-${touch.floorId}`];
      if (
        this.contextMenuStatuses
          .filter(
            d => (d.floorId === touch.floorId)
          ).length === 0) {
        this.openContextMenu(touch);
      } else if (
        existRef &&
        !this.isTouchObjectByRect(touch, existRef[0].getBoundingClientRect())
      ) {
        this.closeContextMenu(touch);
      }
    },
    openContextMenu(touch) {
      const style = {
        left: `${touch.x}px`,
        top: `${touch.y}px`,
      };
      const refName = `context-menu-${touch.floorId}`;
      const status = {
        floorId: touch.floorId,
        style,
        refName
      };
      this.contextMenuStatuses.push(status);
    },
    closeContextMenu(touch) {
      const floorId = touch.floorId;
      this.contextMenuStatuses = this.contextMenuStatuses.filter(s => s.floorId !== floorId);
    },
    getStyleByContextMenuPosition() {
      // TODO タッチ位置に合わせて出す位置調整
    },
    openPinList() {
      // ピン一覧
    },
    createPin() {
      // TODO ピンする
    },
    removePin() {
      // TODO アンピンする
    },
    offRecord() {
      // TODO オフレコにする
    },
    leave() {
      // TODO 退席
    },
    exitWall() {
      // TODO 会議終了
    },
    removeContent() {
      // TODO コンテンツを消す
    },
    removeWord() {
      // TODO ワードを消す
    },
    getRandomStyleForImage() {
      const x = _.random(window.innerWidth);
      const y = _.random(window.innerHeight);
      const style = {
        left: `${x}px`,
        top: `${y}px`,
      };
      return style;
    },
    getRandomStyleForKeyWord() {
      const x0 = 800;
      const y0 = 600;
      const x = _.random(x0, window.innerWidth - x0);
      const y = _.random(y0, window.innerHeight - y0);
      const style = {
        left: `${x}px`,
        top: `${y}px`,
      };
      return style;
    },
    getComputedStyleForLayer(index) {
      const z = START_Z_AXIS - (index * Z_STEP);
      const alpha = 1 - (index * 0.08);
      const zIndex = SHOW_LAYER_NUM - index;
      const style = {
        transform: `translate3D(0px, 0px, ${z}px)`,
        opacity: alpha,
        zIndex
      };
      return style;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.layer-list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  perspective: 100px;
  perspective-origin: center center;

  // TODO仮
  font-size: 10rem;
}

.layer-list {
  width: 100%;
  height: 100%;
  display: flex;
  transform-origin: center center;
  transform-style: preserve-3D;
}

.layer {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}

.layer__img {
  position: absolute;
  max-width: 600px;
  max-height: 600px;
}

.layer__word {
  position: absolute;
  color: darkred;
  font-weight: bold;
}

.context-menu {
  position: absolute;
  width: 400px;
  height: 600px;
  background: #f2f2f2;
}
</style>
