// document.getElementById('input-submit').addEventListener('click', function() {
//
//   console.log('screenshot');
//
//   // html2canvas(document.body).then(function(canvas) {
//   //     // Export the canvas to its data URI representation
//   //     var base64image = canvas.toDataURL("image/png");
//   //
//   //     // Open the image in a new window
//   //     window.open(base64image , "_blank");
//   // });
//
//   // html2canvas(document.body, { letterRendering: 1, allowTaint : true, onrendered : function (canvas) { } }).then(function(canvas) {
//   //   // Export canvas as a blob
//   //   canvas.toBlob(function(blob) {
//   //       // Generate file download
//   //       // window.saveAs(blob, "yourwebsite_screenshot.png");
//   //       saveBlob(blob, "yourwebsite_screenshot.png")
//   //
//   //   });
//   // });
//
//   html2canvas(document.body, { letterRendering: 1, allowTaint : true, onrendered : function (canvas) { } }).then(function(canvas) {
//     // Export the canvas to its data URI representation
//     var base64image = canvas.toDataURL("image/png");
//     // Open the image in a new window
//     window.open(base64image , "_blank");
//   });
//
//
// }, false);

// document.getElementById('input-submit').addEventListener('click', function() {
//
//   console.log('screenshot');
//
//   window.print({ 'shouldPrintBackgrounds': true });
//
// }, false);


// 画像のダウンロード
function saveBlob(blob, fileName)
{
    var url = (window.URL || window.webkitURL);
    // ダウンロード用のURL作成
    var dataUrl = url.createObjectURL(blob);
    // イベント作成
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // a要素を作成
    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    // ダウンロード用のURLセット
    a.href = dataUrl;
    // ファイル名セット
    a.download = fileName;
    // イベントの発火
    a.dispatchEvent(event);
}
