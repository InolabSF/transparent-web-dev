// メニュー開閉ボタン
$('#wrapper').on('click', '.btn-menu01', function(event) {
  console.log('メニュー開閉ボタン');

  menuHidden = !menuHidden;
  if (menuHidden) {
    dimensionValue5 = 'off';
  }else {
    dimensionValue5 = 'on';
  }

  document.cookie = 'menuHidden=' + menuHidden

  try {
    gtag('event', 'menu_dimension', {'menu': dimensionValue5});
  }
  catch(error) {
    console.error('ga blocked');
    console.error(error);
  }
});

//  表示テキストONOFFボタン
$('#wrapper').on('click', '.on-txt-hidden', function(event) {
  console.log('表示テキストONOFFボタン');
  textHidden = !textHidden;
  if(textHidden) {
    dimensionValue1 = 'off';
  }else {
    dimensionValue1 = 'on';
  }

  console.log('textHidden')
  console.log(textHidden)
  document.cookie = 'textHidden=' + textHidden

  try {
    gtag('event', 'text_dimension', {'text': dimensionValue1});
  }
  catch(error) {
    console.error('ga blocked');
    console.error(error);
  }
});


document.getElementById('input-submit').addEventListener('click', function() {
  setTimeout(function() {

      // 検索キーワードの取得
      console.log(TRANSCRIPTS.getKeywords());
      console.log(TRANSCRIPTS.getKeywords().length.toString());
      dimensionValue2 = TRANSCRIPTS.getKeywords().length.toString();

      try {
        gtag('event', 'keywordSum_dimension', {'keywordSum': dimensionValue2});
      }
      catch(error) {
        console.error('ga blocked');
        console.error(error);
      }
  });
}, false);


document.getElementById('on-switch-media').addEventListener('click', function() {
  setTimeout(function() {
    // メディアのタイプの取得
    mediaType = TRANSCRIPTS.getMediaType()
    console.log(mediaType);
    document.cookie = 'mediaType=' + mediaType

    if (mediaType==0) {
      dimensionValue3 = 'image';
    } else if (mediaType==1) {
      dimensionValue3 = 'webpage';
    } else if (mediaType==2) {
      dimensionValue3 = 'video';
    };

    try {
      gtag('event', 'media_dimension', {'media': dimensionValue3});
    }
    catch(error) {
      console.error('ga blocked');
      console.error(error);
    }
  });
}, false);

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

function getCookieArray() {
  var arr = new Array();
  if (document.cookie != '') {
    var tmp = document.cookie.split('; ');
    for (var i=0;i<tmp.length;i++) {
      var data = tmp[i].split('=');
      arr[data[0]] = decodeURIComponent(data[1]);
    }
  }
  return arr;
}

function init_setting () {
  console.log( 'init setting' );
  // console.log( 'cookies' );
  // var cookies = getCookieArray();
  // console.log( cookies );
  //
  // if (cookies['menuHidden'] == 'true') {
  //   document.getElementById('btn-menu').click();
  // }
  //
  // if (cookies['textHidden'] == 'true') {
  //   document.getElementById('txt-toggle').click();
  // }
  //
  // if (cookies['commentHidden'] == 'true') {
  //   document.getElementById('comment-toggle').click();
  // }
  dimensionValue1 = 'on';
  dimensionValue2 = TRANSCRIPTS.getKeywords().length.toString();
  dimensionValue3 = 'image';
  dimensionValue4 = 'off';
  dimensionValue5 = 'off';
  try {
    gtag('event', 'text_dimension', {'text': dimensionValue1});
    gtag('event', 'keywordSum_dimension', {'keywordSum': dimensionValue2});
    gtag('event', 'media_dimension', {'media': dimensionValue3});
    gtag('event', 'recording_dimension', {'recording': dimensionValue4});
    gtag('event', 'menu_dimension', {'menu': dimensionValue5});
  }
  catch(error) {
    console.error('ga blocked');
    console.error(error);
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


$('#wrapper').on('click', '#transparent-container .btn-close02', function(event) {
  setTimeout(function() {
    // メディアのタイプの取得
    console.log("transcript_id: ", $(event.currentTarget).closest('.media-photo').attr('data-id'));

    console.log("search id: ", $(event.currentTarget).closest('.media-photo').attr('data-searchid'));
    // related content id の取得
    console.log("related content id: ", $(event.currentTarget).closest('.media-photo').attr('data-relatedcontentid'));

    search_id = $(event.currentTarget).closest('.media-photo').attr('data-searchid')
    related_content_id = $(event.currentTarget).closest('.media-photo').attr('data-relatedcontentid')

    if (related_content_id) {
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
  init_setting();
  // ドラッグOFF
  //- TRANSCRIPTS.offDraggable();
}, false);
