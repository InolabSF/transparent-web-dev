<template>
  <div>
    <div id="grid-layer" class="is-move">
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
      <div class="grid"><span class="line"></span></div>
    </div>
    <div id="media-leyer" v-if="positionMap.length > 0">
      <transition-group
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="post transit" v-for="(layer, layerIndex) in aggregatedLayers" v-if="minLayerIndex <= layerIndex && layerIndex <= maxLayerIndex" :key="layerIndex">
          <div class="media-container" :style="getLayerStyle(layerIndex)" :data-keyword-color="getKeywordColor(layerIndex)">
            <div
              v-for="(content, contentIndex) in layer.related_contents.slice(0, $props.maxContentNum)"
              :key="content.id"
              :data-layer-id="layer.id"
              :data-content-id="content.id"
              class="item"
              :style="getImageStyle(layerIndex, contentIndex)"
            >
              <div class="media-photo">
                <!-- NOTE: なぜかイメージより前に出てきているので消している-->
                <!--<div class="bg"></div>-->
                <img ref="images" :src="content.img_url" class="img" :data-content-id="content.id">
                <ul class="pin-list">
                  <li v-for="(pin, k) in content.usersPinContents" :key="k" :data-color="getColorMap()[pin.user.floorId]"></li>
                  <!--<li data-color="yellow"></li>-->
                </ul>
                <button class="btn-pin" ref="pinButtonOnList" :data-content-id="content.id"></button>
              </div>
            </div>
            <div class="item" :style="getImageStyle(layerIndex, layer.related_contents.length)">
              <div class="keyword-box" data-searchid="27093">
                <!-- TODO 時間 -->
                <div class="time-stamp">{{ moment(layer.created_at).format('H:m:s') }}</div>
                <div class="keyword-text">
                  <span>{{ layer.words.join(' + ') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div id="media-send-leyer">
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
      <div class="send-area"></div>
    </div>
    <image-detail-modal
      :isShow="isShowContentDetailModal"
      :onClose="closeContentDetailModal"
      :content="currentDetailModalContent"
      :floorId="currentContentDetailModalFloor"
    ></image-detail-modal>
    <!--<div class="hitTest" ref="hitTest">hit test</div>-->
    <context-menu
      v-for="(status, i) in contextMenuStatuses"
      v-if="status"
      :key="i"
      :status="status"
      :ref="status.refName"
      :onClickPinList="() => { isShowPinListModal = true }"
      :onClickExitMeeting="() => { isShowPinListModal = true; isConfirmExit = true; }"
      :onClickCloseButton="() => { closeContextMenu(status.floorId) }"
    ></context-menu>
    <pin-list
      v-if="isShowPinListModal"
      :onClose="() => { this.isShowPinListModal = false }"
      :isConfirmExit="isConfirmExit"
    ></pin-list>
  </div>
</template>

<style lang="scss" scoped>
.hitTest {
  background: red;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 400px;
  right: 400px;
}
</style>

<script>
import client from "@/core/ApiClient";
import _ from "lodash";
import moment from "moment";
import customTouchEventDriver from "@/mixins/customTouchEventDriver";
import Hammer from "hammerjs";
import $ from "jquery";
import ImageDetailModal from "@/components/ImageDetailModal";
import ContextMenu from "@/components/ContextMenu";
import PinList from "@/components/PinList";

const START_Z_AXIS = 50; // 先頭z座標
const Z_STEP = 10; // 1レイヤー間のz深度
const SHOW_LAYER_NUM = 10 // 階層数
const DEBOUNCE_SECOND = 100;

export default {
  name: "Meeting",
  mixins: [customTouchEventDriver],
  components: {
    ImageDetailModal,
    ContextMenu,
    PinList
  },
  props: {
    maxLayerNum: {
      type: Number,
      default: 10
    },
    maxContentNum: {
      type: Number,
      default: 10
    }
  },
  async created() {
    createjs.Sound.play('grid');
    const opts = {
      wallId: this.$route.params.wallId
    };

    // NOTE: GET console/configでsubscriptionKeyが取得できるのを待つ
    if (window.key) {
      startRecognizeSpeachSDK(opts);
    } else {
      window.addEventListener('RECOGNIZER_CONFIG_FETCH_COMPLETE', () => {
        startRecognizeSpeachSDK(opts);
      });
    }

    this.listenPersonalTouch();

    this.initializePinchEvent();
    this.fetchAllUsersPinStatus();

    // TODO transcriptsの取得
    await this.fetchTranscripts();
    this.currentShowMediaLayerIndex = this.layers.length;

    if (!this.$route.query.stopPolling) {
      this.startListenTranscriptsUpdate();
    }

    await this.$nextTick();
    this.calcSendPosition();

    window.fetchTranscripts = this.fetchTranscripts;
    window.startListenTranscriptsUpdate = this.startListenTranscriptsUpdate;
    window.stopListenTranscriptsUpdate = this.stopListenTranscriptsUpdate;

    this.listenLayerIndexChange();
  },
  data() {
    return {
      moment,
      currentShowMediaLayerIndex: 0,
      currentShowMediaPoiner: 0,
      fetchTranscriptsInterval: null,
      isConfirmExit: false,
      layers: [],
      isShowPinListModal: false,
      isShowContentDetailModal: false,
      currentContentDetailModalFloor: 1,
      currentDetailModalContent: null,
      contextMenuStatuses: [],
      positionMap: [],
      cachedLayerStyles: [],
      lastRelatedContents: [],
      lastSearches: [],
    }
  },
  computed: {
    minLayerIndex() {
      return this.currentShowMediaLayerIndex - this.maxLayerNum;
    },
    maxLayerIndex() {
      return this.currentShowMediaLayerIndex - 1;
    },
    aggregatedLayers() {
      const aggregated = this.layers;

      let allPinnedContents = [];
      this.$store.state.loginUsers.forEach(u => {
        if (u.pinnedContents.length) {
          allPinnedContents = allPinnedContents.concat(u.pinnedContents);
        }
      });

      aggregated.map(l => {
        // l.pins = allPinnedContents.filter(c => (c.id === l.content_id));
        l.related_contents = l.related_contents.map(rc => {
          // const targetContent = allPinnedContents.find(_c => (rc.id === _c.id));
          const pinnedUsers = this.$store.state.loginUsers.filter(u => {
            return u.pinnedContents.find(pc => pc.id === rc.id);
          });

          const usersPinContents = pinnedUsers.map(u => {
            return {
              user: u,
              content: u.pinnedContents.find(pc => pc.id === rc.id)
            };
          });
          rc.usersPinContents = usersPinContents;
          return rc;
        });
        return l;
      });
      return aggregated;
    }
  },
  // watch: {
  //   layers(val, beforeVal) {
  //     if (val.length > beforeVal.length) {
  //       // NOTE: 最先端にいるときだけに絞っているがそれが良いかどうかはユーザーテストが必要
  //       if (true || this.currentShowMediaLayerIndex == this.maxLayerIndex) {
  //         // this.incrementCurrentShowMediaLayerIndex();
  //         // this.updateLatestCurrentShowMediaLayerIndex();
  //       }
  //     }
  //   }
  // },
  methods: {
    async fetchAllUsersPinStatus() {
      const key = this.$route.query.key;
      const url = `/next100/wall/${key}/pinned`;
      const res = await client.get(url);
      const contents = res.data;

      const updateUsers = this.$store.state.loginUsers.map(u => {
        const myPinnedContents = contents.filter(c => {
          return c.pins.filter(p => p.eventuser_id === u.name).length > 0;
        });
        u.pinnedContents = myPinnedContents;
        return u;
      });

      this.$store.commit('setState', {
        loginUsers: updateUsers
      });
    },
    listenLayerIndexChange() {
      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'ArrowUp') {
          this.incrementCurrentShowMediaLayerIndex();
        } else if (evt.key === 'ArrowDown') {
          this.decrementCurrentShowMediaLayerIndex();
        }
      })
    },
    updateLatestCurrentShowMediaLayerIndex() {
      this.currentShowMediaLayerIndex = this.layers.length;
    },
    incrementCurrentShowMediaLayerIndex() {
      if (this.currentShowMediaLayerIndex + 1 >= this.layers.length) {
        this.currentShowMediaLayerIndex = this.layers.length;
      } else {
        this.currentShowMediaLayerIndex += 1;
      }

      if (this.currentShowMediaPointer + 1 >= this.layers.length) {
        this.currentShowMediaPoiner = this.layers.length;
      } else {
        this.currentShowMediaPoiner += 1;
      }
    },
    decrementCurrentShowMediaLayerIndex() {
      if (this.currentShowMediaLayerIndex - 1 <= 0) {
        this.currentShowMediaLayerIndex = 0;
      } else {
        this.currentShowMediaLayerIndex -= 1;
      }

      if (this.currentShowMediaPoiner - 1 <= 0) {
        this.currentShowMediaPoiner = 0;
      } else {
        this.currentShowMediaPoiner -= 1;
      }
    },
    listenPersonalTouch() {
      window.addEventListener('CUSTOM_TOUCH_START', this.onTouchStartTable);
      window.addEventListener('CUSTOM_TOUCH_END', this.onTouchEndTable);
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

      const isSizeUp = related_contents && (related_contents.length > this.lastRelatedContents.length);

      if (!isSizeUp) {
        return;
      }

      this.lastRelatedContents = related_contents || [];
      this.lastSearches = searches || [];
      this.updateLayers(searches, related_contents);
    },
    updateLayers(searches, related_contents) {
      let layers = searches.map(s => {
        s.related_contents = related_contents.filter(r => ( r.transcript_id === s.transcript_id ));
        return s;
      });

      layers = layers.filter((l) => {
        return l.related_contents && l.related_contents.length > 0;
      });

      // layers = layers.slice(0, 10);

      if (this.layers[0] && this.layers[0].id === layers[0].id) {
        return false;
      } else {
        this.layers = layers.reverse();
      }

      this.updateLatestCurrentShowMediaLayerIndex();
    },
    onClickImage({floorId, contentId}) {
      this.openContentDetailModal({floorId, contentId});
    },
    openContentDetailModal({floorId, contentId}) {
      if (this.isShowContentDetailModal) {
        return;
      }

      // ID識別で向きを変える
      this.currentContentDetailModalFloor = floorId;

      const layer = this.layers.find(l => {
        return l.related_contents.find(c => ( c.id === contentId ));
      });

      if (!layer) {
        return false;
      }

      const content = layer.related_contents.find(c => ( c.id === contentId ));
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
    onTouchStartTable(evt) {
      const touch = evt.detail[0];
      this.$store.commit('updateLoginUser', {
        floorId: touch.floorId,
        params: {
          lastCustomTouchStartTime: new Date().getTime()
        }
      });
    },
    onTouchEndTable(evt) {
      createjs.Sound.play('tap');

      // 詳細モーダル開いているときは反応しないように
      if (this.isShowContentDetailModal) {
        return false;
      }

      // ピン一覧モーダル開いているときは反応しないように
      if (this.isShowPinListModal) {
        return false;
      }

      // TODO シーン判別のようなものを追加
      // TODO 長押しで開く
      const touch = evt.detail[0];
      const currentUser = this.$store.state.loginUsers.find(u => u.floorId === touch.floorId);

      // ユーザー終了確認モーダル
      if (
        this.$store.getters.isShowUserOverlay &&
        currentUser.isConfirmTalkEndModal
      ) {
        this.isShowPinListModal = true;
        this.isConfirmExit = true;
        this.$store.commit('updateAllLoginUser', {
          params: {
            isConfirmTalkEndModal: false
          }
        });
        return false;
      }

      // ピンボタン
      const touchedPin = this.$refs.pinButtonOnList && this.$refs.pinButtonOnList.find(p => {
        return this.isTouchObjectByElement(touch, p)
      });
      if (touchedPin) {
        const contentId = Number(touchedPin.getAttribute('data-content-id'));
        // TODO パフォーマンスチューニングの余地あり
        const targetLayer = this.aggregatedLayers.find(l => l.related_contents.find(rc => rc.id === contentId));
        const content = targetLayer.related_contents.find(rc => rc.id === contentId);
        this.togglePinByFloorId(touch.floorId, content);
        return false;
      }

      // NOTE: 外野アラート
      if (touch.floorId === 0) {
        alert('テーブルサイドに立ってタップしてください');
        return false;
      }

      // NOTE: 未ログインユーザーの場合、ログイン
      const isExistUsr = !!this.$store.state.loginUsers.find(u => u.floorId === touch.floorId);
      if (!isExistUsr) {
        this.login(touch.floorId);
        return false;
      }

      // 既に開いているコンテキストメニューをガード
      const myContextMenu = this.$refs[`context-menu-${touch.floorId}`];
      if (myContextMenu && myContextMenu[0] && myContextMenu[0].$el && this.isTouchObjectByElement(touch, myContextMenu[0].$el)) {
        return false;
      }

      // NOTE 画像触ったら反応しない
      let isTouchImage = false;
      let touchedImage;

      const touchedImages = [];

      // if (this.isTouchObjectByElement(touch, this.$refs.hitTest)) {
      //   if (this.layers.length) {
      //     this.onClickImage({floorId: 1, contentId: this.layers[0].related_contents[0].id});
      //   } else {
      //     console.error('not exist content');
      //   }
      // }

      if (this.$refs.images) {
        this.$refs.images.forEach((img) => {
          if (this.isTouchObjectByElement(touch, img)) {
            isTouchImage = true;
            touchedImages.push(img);
            return false;
          }
        });
      }

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


      // 以下長押し判定のみでガード
      const timeDiff = new Date().getTime() - currentUser.lastCustomTouchStartTime;
      const isLongTouch = 300 <= timeDiff && timeDiff <= 2000;
      // if (!isLongTouch) {
      //   return false;
      // };

      // NOTE: refsは配列で返ってくる
      const existContextMenu = this.$refs[`context-menu-${touch.floorId}`];

      if (
        // 未開の場合
        existContextMenu &&
        existContextMenu.length > 0 &&
        !this.isTouchObjectByElement(touch, existContextMenu[0].$el) &&
        this.isExistContextMenuByFloorId(touch.floorId)
      ) {
        this.closeContextMenu(touch.floorId);
      // } else if (
      //   !this.isExistContextMenuByFloorId(touch.floorId)
      // ) {
      //   this.openContextMenu(touch);
      } else if (isLongTouch) {
        // NOTE: ここまでに他のタッチ動作はガードしている前提なのでいける（詳細モーダル・ログイン）
        this.openContextMenu(touch);
      }
    },
    isExistContextMenuByFloorId(floorId) {
      return !!this.contextMenuStatuses.find(d => d.floorId === floorId);
    },
    openContextMenu(touch) {
      const isExist = this.contextMenuStatuses.find(d => d.floorId === touch.floorId);
      if (isExist) {
        console.log('is exist context menu floor id: ' + touch.floorId);
        return false;
      }

      const d = this.getTransformDegByFloorId(touch.floorId);
      const style = {
        position: 'absolute',
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
    closeContextMenu(floorId) {
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
      hammer.on('pinchout', _.debounce(this.onPinchOut, DEBOUNCE_SECOND));
      hammer.on('pinchin', _.debounce(this.onPinchIn, DEBOUNCE_SECOND));
    },
    onPinchOut() {
      if (this.isGuradTouchEvent()) {
        return false;
      }
      this.decrementCurrentShowMediaLayerIndex();
    },
    onPinchIn() {
      if (this.isGuradTouchEvent()) {
        return false;
      }
      this.incrementCurrentShowMediaLayerIndex();
    },
    isGuradTouchEvent() {
      // 詳細モーダル開いているときは反応しないように
      if (this.isShowContentDetailModal) {
        return true;
      }

      // ピン一覧モーダル開いているときは反応しないように
      if (this.isShowPinListModal) {
        return true;
      }

      return false;
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
        // console.log('x:'+x);
        // console.log('y:'+y);
        // console.log('x_max:'+x_max);
        // console.log('y_max:'+y_max);
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
      const step = 0.2;
      // const startScale = 1 - (this.maxLayerNum * step);
      // const distance = index - this.minLayerIndex;
      // const calcedScale = startScale * (distance * step);
      const distanceFromLatest = this.maxLayerIndex - index;
      const calcedScale = Math.pow(step, distanceFromLatest);

      const style = {
        // 'transform': 'translate3d(0,0,'+ (500*index-4500) +'px) rotate('+rotate[index]+')',
        'transform': `scale(${calcedScale}) rotate(${rotate[index % rotate.length]})`,
        'transition': 'all .5s',
        // 'filter':'blur('+ (90 - (index*10)) +'px)',
        // 'opacity':(0.1 + (index*0.1))
      };
      return style;
    },
    getImageStyle(layerIndex, contentIndex) {
      const cachedStyle = this.cachedLayerStyles[layerIndex] && this.cachedLayerStyles[layerIndex][contentIndex] || null;
      if (cachedStyle) {
        return cachedStyle;
      }
      const pos_data = this.positionMap;
      const key = contentIndex % pos_data.length;
      const rotate = ['0deg', '90deg', '180deg', '270deg'];
      const top = _.random(pos_data[key].y_max, pos_data[key].y);
      const left = _.random(pos_data[key].x_max,pos_data[key].x);
      // const center_x = parseInt($(this).children().width() / 2);
      // const center_y = parseInt($(this).children().height() / 2);
      // TODO サイズ調整
      // const center_x = parseInt(window.innerWidth / 4 / 2);
      // const center_y = parseInt(window.innerHeight / 5 / 2);
      this.arreyShuffle(rotate);
      const style = {
        // 'top': top - center_y+'px',
        // 'left':left - center_x+'px',
        'top': top +'px',
        'left':left +'px',
        'transform':'rotate('+rotate[contentIndex % rotate.length]+')'
      };

      if (!this.cachedLayerStyles[layerIndex]) {
        this.cachedLayerStyles[layerIndex] = [];
      }

      this.cachedLayerStyles[layerIndex][contentIndex] = style;
      return style;
    },
    getKeywordColor(index) {
      const keyword_color = ['red', 'blue', 'green', 'yellow', 'purple', 'vermilion', 'yellowgreen', 'orange', 'lightblue', 'gold', 'pink', 'bluegreen', 'white'];
      const key = index % this.positionMap.length;
      return keyword_color[key];
    },
    updateLayer() {
      client.get('');
    },
    startListenTranscriptsUpdate() {
      this.fetchTranscriptsInterval = setInterval(() => {
        this.fetchTranscripts();
      }, 1000);
    },
    stopListenTranscriptsUpdate() {
      clearInterval(this.fetchTranscriptsInterval);
      this.fetchTranscriptsInterval = null;
    },
    convertJSONString(object) {
      return JSON.stringify(object);
    }
  }
};
</script>

<style lang="scss" scoped>
.media-send-leyer {
  pointer-events: none;
}
/*.wrapper {*/
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 0;*/
  /*width: 100%;*/
  /*height: 100%;*/
/*}*/

/*.layer-list-wrapper {*/
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 0;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*display: flex;*/
  /*perspective: 100px;*/
  /*perspective-origin: center center;*/

  /*// TODO仮*/
  /*font-size: 10rem;*/
/*}*/

/*.layer-list {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*display: flex;*/
  /*transform-origin: center center;*/
  /*transform-style: preserve-3D;*/
/*}*/

/*.layer {*/
  /*position: absolute;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*display: flex;*/
/*}*/

/*.layer__img {*/
  /*position: absolute;*/
  /*max-width: 600px;*/
  /*max-height: 600px;*/
/*}*/

/*.layer__word {*/
  /*position: absolute;*/
  /*color: darkred;*/
  /*font-weight: bold;*/
/*}*/

/*.context-menu {*/
  /*position: absolute;*/
  /*width: 400px;*/
  /*height: 600px;*/
  /*background: #f2f2f2;*/

  /*font-sizd: 2vw;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
/*}*/

/*.modal-content {*/
  /*font-size: 2vw;*/
  /*color: #fff;*/
/*}*/
</style>


