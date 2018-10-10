<template>
  <!--<h1>Let's Talk!!</h1>-->
  <!--レイヤーと奥行き表示ロジック-->
  <!--<div>TODO コンテキストメニュー＋QRコード</div>-->
  <!--<div>TODO コンテキスト（leave確認）</div>-->
  <div class="wrapper">
    <div class="layer-list-wrapper">
      <div class="layer-list">
        <div class="layer" :style="layerStyles[i]" v-for="layer, i in layers">
          <div class="layer__word" :style="keywordStyles[i]">{{ layer.words[0] }}</div>
          <img ref="images" class="layer__img" :style="imageStyles[i]" v-for="content, j in layer.related_contents" :key="content.id" :data-layer-id="layer.id" :data-content-id="content.id" :src="content.img_url" @click="onClickImage(content)" />
        </div>
      </div>
    </div>
    <template v-for="stat in contextMenuStatuses">
      <div
        class="context-menu"
        :style="stat.style"
        :ref="stat.refName"
      >
        ユーザー 000{{stat.floorId}} <br>
        のメニュー
      </div>
    </template>
    <template v-if="isShowContentDetailModal">
      <div class="modal is-active">
        <div class="modal-background" @click.prevent="closeContentDetailModal"></div>
        <!--<div class="modal-background"></div>-->
        <div class="modal-content" v-if="currentDetailModalContent" :style="currentDetailModalStyle">
          <p>{{ currentDetailModalContent.title }}</p>
          <p class="image is-4by3">
            <img :src="currentDetailModalContent.img_url" alt="">
          </p>
          <p>{{ currentDetailModalContent.desc }}</p>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    </template>

  </div>
</template>

<script>
import client from "@/core/ApiClient";
import _ from "lodash";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";

const START_Z_AXIS = 50; // 先頭z座標
const Z_STEP = 10; // 1レイヤー間のz深度
const SHOW_LAYER_NUM = 10 // 階層数

export default {
  name: "Meeting",
  mixins: [customTouchEventDriver],
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
      currentDetailModalContent: null,
      currentDetailModalStyle: {},
      contextMenuStatuses: [],
      layerStyles: _.range(10).map((i) => {
        return this.getComputedStyleForLayer(i);
      }),
      keywordStyles: _.range(10).map(() => {
        return this.getRandomStyleForKeyWord()
      }),
      imageStyles: _.range(10).map(() => {
        return this.getRandomStyleForImage();
      }),
    }
  },
  computed: {
  },
  methods: {
    listenPersonalTouch() {
      window.addEventListener('CUSTOM_TOUCH_START', this.onClickTable);
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
    onClickImage({floorId, contentId}) {
      this.openContentDetailModal({floorId, contentId});
    },
    openContentDetailModal({floorId, contentId}) {
      if (this.isShowContentDetailModal) {
        return;
      }

      // ID識別で向きを変える
      const layer = this.layers.find(l => {
        return l.related_contents.find(c => ( c.id === contentId ));
      });

      if (!layer) {
        return false;
      }

      const content = layer.related_contents.find(c => ( c.id === contentId ));
      this.currentDetailModalStyle = this.getModalStyleByFloorId(floorId);
      this.currentDetailModalContent = content;
      this.isShowContentDetailModal = true;
      this.contentDetailOpenTime = new Date().getTime();
    },
    closeContentDetailModal() {
      const waitTime = 1000;
      const time = new Date().getTime() - this.contentDetailOpenTime;
      if (time <= waitTime) {
        return false;
      }
      this.isShowContentDetailModal = false;
    },
    onClickTable(evt) {
      // TODO シーン判別のようなものを追加
      // TODO 長押しで開く
      const touch = evt.detail[0];

      // NOTE 画像触ったら反応しない
      let isTouchImage = false;
      let touchedImage;

      const touchedImages = [];
      this.$refs.images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (this.isTouchObjectByRect(touch, rect)) {
          isTouchImage = true;
          touchedImages.push(img);
          return false;
        }
      });

      if (isTouchImage) {
        // TODO: 先頭だけ取り出す 要ブラッシュアップ
        touchedImages.sort((a, b) => {
          const aId = Number(a.getAttribute('data-content-id'));
          const bId = Number(b.getAttribute('data-content-id'));
          return aId < bId ? -1 : 1;
        });

        const latestTouchedImage = touchedImages[0];

        const floorId = touch.floorId;
        const contentId = Number(latestTouchedImage.getAttribute('data-content-id'));
        this.onClickImage({floorId, contentId});
        return false;
      }

      // NOTE: refsは配列で返ってくる
      const existRef = this.$refs[`context-menu-${touch.floorId}`];
      if (
        existRef &&
        existRef.length > 0 &&
        !this.isTouchObjectByRect(touch, existRef[0].getBoundingClientRect())
      ) {
        this.closeContextMenu(touch);
      } else if (
        this.contextMenuStatuses
          .filter(
            d => (d.floorId === touch.floorId)
          ).length === 0
      ) {
        this.openContextMenu(touch);
      }
    },
    openContextMenu(touch) {
      const d = this.getTransformDegByFloorId(touch.floorId);
      const style = {
        left: `${touch.x}px`,
        top: `${touch.y}px`,
        transform: `rotate(${d}deg)`,
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

  font-sizd: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  font-size: 2vw;
  color: #fff;
}
</style>
