<template>
  <!--<h1>Let's Talk!!</h1>-->
  <!--レイヤーと奥行き表示ロジック-->
  <!--<div>TODO コンテキストメニュー＋QRコード</div>-->
  <!--<div>TODO コンテキスト（leave確認）</div>-->
  <div class="layer-list-wrapper">
    <div class="layer-list">
      <div class="layer" :style="getComputedStyleForLayer(i)" v-for="layer, i in layers">
        <div class="layer__word" :style="getRandomStyleForKeyWord()">{{ layer.words[0] }}</div>
        <img class="layer__img" :style="getRandomStyleForImage()" v-for="content in layer.related_contents" :key="content.id" :src="content.img_url" />
      </div>
    </div>
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
      contextMenuStatuses: []
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
    onClickThumbnail() {
      // TODO モーダル開く
      // ID識別で向きを変える
    },
    onClickTable(evt) {
      const touch = evt.detail[0];
      // TODO ID識別
      // TODO 既に開いているコンテキストメニューがあったら
      if (true) {

      } else {
        this.openContextMenu({x: 200, y: 400})
      }
    },
    openContextMenu(floorId, touchedPosition) {
      const {x, y} = touchedPosition;
      const status = {
        floorId,
        x,
        y,
      };
      this.contextMenuStatuses.push();
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
.layer-list-wrapper {
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
</style>
