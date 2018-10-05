<template>
  <div>
    <h1>Let's Talk!!</h1>
    <!--レイヤーと奥行き表示ロジック-->
    <!--<div>TODO コンテキストメニュー＋QRコード</div>-->
    <!--<div>TODO コンテキスト（leave確認）</div>-->
  </div>
</template>

<script>
export default {
  name: "Meeting",
  created() {
    const opts = {
      wallId: this.$route.params.wallId
    };
    startRecognizeSpeachSDK(opts);
    // TODO transcriptsの取得
  },
  data() {
    return {
      isShowContentDetailModal: false,
      currentContentDetailModalFloor: false,
      contextMenuStatuses: []
    }
  },
  methods: {
    onClickThumbnail() {
      // TODO モーダル開く
      // ID識別で向きを変える
    },
    onClickTable() {
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
    }
  }
};
</script>
