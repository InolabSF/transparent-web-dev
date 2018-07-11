// document.getElementById('btn-menu').addEventListener('click', function() {
//
//     setTimeout(function() {
//
//         menuHidden = !menuHidden;
//         if(menuHidden) {
//           var dimensionValue = 'off';
//         }else {
//           var dimensionValue = 'on';
//         }
//
//         document.cookie = 'menuHidden=' + menuHidden
//
//         if(ga === undefined) {
//           console.log('undefined');
//         }else {
//           ga('set', 'dimension5', dimensionValue);
//         };
//
//     }, 100);
//
// }, false);

document.getElementById('input-submit').addEventListener('click', function() {
    setTimeout(function() {

        // 検索キーワードの取得
        console.log(TRANSCRIPTS.getKeywords());
    });
}, false);

// document.getElementById('txt-toggle').addEventListener('click', function() {
//     setTimeout(function() {
//
//         textHidden = !textHidden;
//         if(textHidden) {
//           var dimensionValue = 'off';
//         }else {
//           var dimensionValue = 'on';
//         }
//
//         console.log('textHidden')
//         console.log(textHidden)
//         document.cookie = 'textHidden=' + textHidden
//
//         if(ga === undefined) {
//           console.log('undefined');
//         }else {
//           ga('set', 'dimension1', dimensionValue);
//         };
//
//     }, 150);
// }, false);
//
// document.getElementById('comment-toggle').addEventListener('click', function() {
//     setTimeout(function() {
//
//         commentHidden = !commentHidden;
//         if(commentHidden) {
//           var dimensionValue = 'off';
//         }else {
//           var dimensionValue = 'on';
//         }
//
//         console.log('commentHidden')
//         console.log(commentHidden)
//
//         document.cookie = 'commentHidden=' + commentHidden
//
//         if(ga === undefined) {
//           console.log('undefined');
//         }else {
//           ga('set', 'dimension2', dimensionValue);
//         };
//
//     }, 200);
// }, false);

document.getElementById('on-switch-media').addEventListener('click', function() {
    setTimeout(function() {

        // メディアのタイプの取得
        mediaType = TRANSCRIPTS.getMediaType()
        console.log(mediaType);
        document.cookie = 'mediaType=' + mediaType

        if(mediaType==0) {
          var dimensionValue = 'image';
        }else if (mediaType==1) {
          var dimensionValue = 'webpage';
        }else if (mediaType==2) {
          var dimensionValue = 'video';
        };

        if(ga === undefined) {
          console.log('undefined');
        }else {
          ga('set', 'dimension3', dimensionValue);
        };

    });
}, false);

$('#wrapper').on('click', '#transparent-container .btn-close02', function(event) {
    setTimeout(function() {

        console.log("transcript_id: ", $(event.currentTarget).closest('.media-photo').attr('data-id'));
        // if (related_content_id){
        //     deleteContents(related_content_id)
        // } else {
        //     deleteSearch(search_id)
        // }
    }, 100);
});

// window.addEventListener('scroll', function() {
//
//     // スクロールが下部に来たらtrueを返します
//     console.log(TRANSCRIPTS.getScrollBottomPosition());
//
//     if (TRANSCRIPTS.getScrollBottomPosition()) {
//
//       if (!isLoading) {
//         loadPastContents();
//       };
//         //
//         // スクロール下部に来たら実行
//         // TRANSCRIPTS.appendContents(additional_transcripts1);
//     }
// }, false);


function getCookieArray(){
  var arr = new Array();
  if(document.cookie != ''){
    var tmp = document.cookie.split('; ');
    for(var i=0;i<tmp.length;i++){
      var data = tmp[i].split('=');
      arr[data[0]] = decodeURIComponent(data[1]);
    }
  }
  return arr;
}

// var txt_toggle = document.getElementById('txt-toggle')

function init_setting(){
  console.log( 'cookies' );
  var cookies = getCookieArray();
  console.log( cookies );

  if (cookies['menuHidden'] == 'true') {
    document.getElementById('btn-menu').click();
  }

  if (cookies['textHidden'] == 'true') {
    document.getElementById('txt-toggle').click();
  }

  if (cookies['commentHidden'] == 'true') {
    document.getElementById('comment-toggle').click();
  }

  if (cookies['mediaType'] == '1'){
    document.getElementById('btn-webpage').click();
  }else if (cookies['mediaType'] == '2') {
    document.getElementById('btn-video').click();
  }

};

// window.addEventListener('load', init_setting, false);

window.addEventListener('scroll', function() {

    // スクロールが下部に来たらtrueを返します
    console.log(TRANSCRIPTS.getScrollBottomPosition());

    if (TRANSCRIPTS.getScrollBottomPosition()) {

      if (!isLoading) {
        loadPastContents();
      };
        //
        // スクロール下部に来たら実行
        // TRANSCRIPTS.appendContents(additional_transcripts1);
    }
}, false);


// メニュー開閉ボタン
$('#wrapper').on('click', '.btn-menu01', function(event) {
    console.log('メニュー開閉ボタン');
    // console.log(menuHidden);
    //
    // menuHidden = !menuHidden;
    // if (menuHidden) {
    //   var dimensionValue = 'off';
    // }else {
    //   var dimensionValue = 'on';
    // }
    //
    // document.cookie = 'menuHidden=' + menuHidden
    //
    // if(ga === undefined) {
    //   console.log('undefined');
    // } else {
    //   ga('set', 'dimension5', dimensionValue);
    // };
});

//  表示テキストONOFFボタン
$('#wrapper').on('click', '.on-txt-hidden', function(event) {
    console.log('表示テキストONOFFボタン');
});

// コメントカード / テキストの表示非表示の切り替え
//- TRANSCRIPTS.setMediaText(true);

// セッティングメニューの表示非表示の切り替え
// TRANSCRIPTS.setMenu(true);

// メディアタイプの切り替え 0/1/2
//- TRANSCRIPTS.setMediaType(2);


//キーワード追加
//- TRANSCRIPTS.addKeywordList('hogehoge');

// キーワード削除
//- TRANSCRIPTS.removeKeywordList('hogehoge');


$('#wrapper').on('click', '#transparent-container .btn-close02', function(event) {
    setTimeout(function() {
        // メディアのタイプの取得
        console.log("transcript_id: ", $(event.currentTarget).closest('.media-photo').attr('data-id'));

        console.log("search id: ", $(event.currentTarget).closest('.media-photo').attr('data-searchid'));
        // related content id の取得
        console.log("related content id: ", $(event.currentTarget).closest('.media-photo').attr('data-relatedcontentid'));

        search_id = $(event.currentTarget).closest('.media-photo').attr('data-searchid')
        related_content_id = $(event.currentTarget).closest('.media-photo').attr('data-relatedcontentid')

        if (related_content_id){
          deleteContents(related_content_id)
        } else {
          // deleteSearch(search_id)
        }

    }, 100);
});

$('#wrapper').on('click', '#transparent-container .media-photo', function(event) {
    setTimeout(function() {
        // transcript_id の取得
        console.log("transcript_id: ", $(event.currentTarget).closest('.media-photo').attr('data-id'));
        // search id の取得
        console.log("search id: ", $(event.currentTarget).closest('.media-photo').attr('data-searchid'));
        // related content id の取得
        console.log("related content id: ", $(event.currentTarget).closest('.media-photo').attr('data-relatedcontentid'));

        related_content_id = $(event.currentTarget).closest('.media-photo').attr('data-relatedcontentid');
        viewContents(related_content_id)

    }, 200);
});

$('#wrapper').on('click', '#transparent-container .modal-inner .btn-style01', function(event) {
    setTimeout(function() {
        // transcript_id の取得
        console.log("transcript_id: ", $(event.currentTarget).closest('.modal-inner').attr('data-id'));
        // search id の取得
        console.log("search id: ", $(event.currentTarget).closest('.modal-inner').attr('data-searchid'));
        // related content id の取得
        console.log("related content id: ", $(event.currentTarget).closest('.modal-inner').attr('data-relatedcontentid'));

        related_content_id = $(event.currentTarget).closest('.modal-inner').attr('data-relatedcontentid');
        openContents(related_content_id)
    }, 100);
});

window.addEventListener('load', function() {
  // ドラッグON
  TRANSCRIPTS.onDraggable();

  // ドラッグOFF
  //- TRANSCRIPTS.offDraggable();
}, false);
