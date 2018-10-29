<template>
  <div>
    <div v-for="(layer, layerIndex) in layers" :key="layerIndex">
      <div>------------------------------------------------------</div>
      <div>id: {{ layer.id }}</div>
      <div>created_at: {{ layer.created_at }}</div>
      <div>画像:</div>
      <div class="flexbox">
        <img
          v-for="(content, contentIndex) in layer.related_contents"
          :key="content.id"
          @touchstart="onClickImage(content)"
          :src="content.img_url"
          class="image"
        />
      </div>
      <div>キーワード {{ layer.words.join(', ') }}</div>
    </div>
  </div>
</template>

<script>
import client from "@/core/ApiClient";
import _ from "lodash";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import Hammer from "hammerjs";
import $ from "jquery";
import UserLayer from "@/components/UserLayer";

const START_Z_AXIS = 50; // 先頭z座標
const Z_STEP = 10; // 1レイヤー間のz深度
const SHOW_LAYER_NUM = 10 // 階層数

export default {
  name: "Meeting",
  mixins: [customTouchEventDriver],
  components: {
    UserLayer
  },
  async created() {
    const opts = {
      wallId: this.$route.params.wallId
    };
    startRecognizeSpeachSDK(opts);
    // TODO transcriptsの取得
    this.fetchTranscripts();
    this.listenTranscriptsUpdate();
    $('body').css({
      overflow: 'auto'
    });
    // this.listenPersonalTouch();
    //
    // this.initializePinchEvent();
    //
    // this.listenTranscriptsPostSuccess();
    //
    // await this.$nextTick();
    // this.calcSendPosition();
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
      positionMap: [],
    }
  },
  computed: {
  },
  methods: {
    onClickTest() {
      alert('test');
    },
    listenPersonalTouch() {
      window.addEventListener('CUSTOM_TOUCH_START', this.onClickTable);
    },
    async fetchTranscripts() {
      const wallId = this.$route.params.wallId;
      const url = `/next100/contents?wall_id=${wallId}`
      const res = await client.get(url);

      // 整形
      const {
        searches,
        search_first_index,
        search_last_index,
        related_contents,
        related_content_last_index
      } = res.data;

      // TODO ここでrelated_contentsが0件場合は新規レイヤーを追加しない
      let layers = searches.map(s => {
        s.related_contents = related_contents.filter(r => ( r.transcript_id === s.transcript_id ));
        return s;
      });

      layers = layers.filter((l) => {
        return l.related_contents && l.related_contents.length > 0;
      });

      this.layers = layers.slice(0, 10);
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
    },
    initializePinchEvent() {
      const square = document.querySelector('#app');
      const hammer = new Hammer(square);
      hammer.get('pinch').set({ enable: true });
      hammer.on('pinchout', (e) => {
        this.logType('pinchout');
        this.logEvent(e);
      });
      hammer.on('pinchin', (e) => {
        this.logType('pinchin');
        this.logEvent(e);
      });
      hammer.on('pinchmove', (e) => {
        this.logType('pinchmove');
        this.logEvent(e);
      });
    },
    logType(type) {
      console.log(type);
    },
    logEvent(e) {
      this.pinchScale = e.scale;
      console.log(e.scale);
    },
    // ランダム整数
    randNum(max,min) {
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    arreyShuffle(array){
      for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }
    },
    calcSendPosition() {
      var posisionMap = [];
      $('#media-send-leyer .send-area').each(function(i){
        var x = parseInt($(this).offset().left);
        var y = parseInt($(this).offset().top);
        var x_max = parseInt(x + $(this).width());
        var y_max = parseInt(y + $(this).height());
        console.log('x:'+x);
        console.log('y:'+y);
        console.log('x_max:'+x_max);
        console.log('y_max:'+y_max);
        //return false;
        var temp = {};
        temp.x = x;
        temp.y = y;
        temp.x_max = x_max;
        temp.y_max = y_max;
        posisionMap[i] = temp;
      });

      this.arreyShuffle(posisionMap);
      this.positionMap = posisionMap;
    },
    getLayerStyle(index) {
      const rotate = ['1deg', '-0deg', '-1deg', '-2deg', '-3deg', '-4deg', '-3deg', '-2deg', '-1deg', '0deg'];
      const style = {
        'transform': 'translate3d(0,0,'+ (500*index-4500) +'px) rotate('+rotate[index]+')',
        'filter':'blur('+ (90 - (index*10)) +'px)',
        'opacity':(0.1 + (index*0.1))
      };
      return style;
    },
    getImageStyle(index) {
      const pos_data = this.positionMap;
      const rotate = ['0deg', '90deg', '180deg', '270deg'];
      const top = _.random(pos_data[index].y_max, pos_data[index].y);
      const left = _.random(pos_data[index].x_max,pos_data[index].x);
      // const center_x = parseInt($(this).children().width() / 2);
      // const center_y = parseInt($(this).children().height() / 2);
      // TODO サイズ調整
      const center_x = parseInt(window.innerWidth / 4 / 2);
      const center_y = parseInt(window.innerHeight / 5 / 2);
      this.arreyShuffle(rotate);
      const style = {
        'top': top - center_y+'px',
        'left':left - center_x+'px',
        'transform':'rotate('+rotate[0]+')'
      };
      return style;
    },
    getKeywordColor(index) {
      const keyword_color = ['red', 'blue', 'green', 'yellow', 'purple', 'vermilion', 'yellowgreen', 'orange', 'lightblue', 'gold', 'pink', 'bluegreen', 'white'];
      return keyword_color[index];
    },
    updateLayer() {
      client.get('');
    },
    listenTranscriptsUpdate() {
      // window.addEventListener('TRANSCRIPT_POST_SUCCESS', () => {
      //   this.fetchTranscripts();
      // });

      setInterval(() => {
        this.fetchTranscripts();
      }, 1000);
    }
  }
};
</script>

<style>
.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
