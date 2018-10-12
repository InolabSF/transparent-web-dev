// import _ from 'lodash';
//
// // カスタムイベントをwindowsから送っている想定でエミュレート
// const sock = new WebSocket(`ws://127.0.0.1:${process.env.VUE_APP_CUSTOM_TOUCH_EVENT_DRIVER_PORT}`);
//
// // 接続
// sock.addEventListener("open", (e) => {
//   console.log("CustomSender: websocket connected");
// });
//
// // サーバーからデータを受け取る
// sock.addEventListener("message", (e) => {
//   const parsed = JSON.parse(e.data);
//   console.log(parsed);
//
//   // TODO 座標を戻す
//   if (parsed.type == "touchstart") {
//     const option = {
//       detail: parsed
//     };
//     const customTouchStartEvent = new CustomEvent('CUSTOM_TOUCH_START', option);
//     window.dispatchEvent(customTouchStartEvent);
//   }
//
//   if (parsed.type == "touchend") {
//     const option = {
//       detail: parsed
//     };
//     const customTouchStartEvent = new CustomEvent('CUSTOM_TOUCH_END', option);
//     window.dispatchEvent(customTouchStartEvent);
//   }
// });
//
// // TODO 実機の場合はフラグでOFFできるようにする
// if (true) {
//   window.addEventListener("DOMContentLoaded", (e) => {
//     // TODO 決め打ち、dat.guiで電極ID選択できるとベスト
//     const floorId = 1;
//     const max = 32768;
//     window.addEventListener("touchstart", (evt) => {
//       for (let i = 0; i < evt.changedTouches.length; i++) {
//         const touch = evt.changedTouches[i];
//         const pos = getConvertedPosition(touch);
//         const params = {
//           type: 'touchstart',
//           identify: i + 1,
//           floorId,
//           x: pos.x,
//           y: pos.y
//         };
//         sock.send(JSON.stringify(params));
//       };
//     });
//     window.addEventListener("touchend", (evt) => {
//       for (let i = 0; i < evt.changedTouches.length; i++) {
//         const touch = evt.changedTouches[i];
//         const pos = getConvertedPosition(touch);
//         const params = {
//           type: 'touchend',
//           identify: i + 1,
//           floorId,
//           x: pos.x,
//           y: pos.y
//         };
//         sock.send(JSON.stringify(params));
//       };
//     });
//   });
// }
//
// function getConvertedPosition(touch) {
//   const x = touch.clientX;
//   const y = touch.clientY;
//   const max = 32768;
//   return {
//     x: _.round(max * x / window.innerWidth),
//     y: _.round(max * y / window.innerHeight)
//   }
// }
//
// // 以下テスト
// window.addEventListener('CUSTOM_TOUCH_START', (evt) => {
//   debugger;
// });
//
// window.addEventListener('CUSTOM_TOUCH_END', (evt) => {
//   debugger;
// });
//
