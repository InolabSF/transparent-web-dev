document.getElementById('btn-menu').addEventListener('click', function() {

    setTimeout(function() {

        menu_hidden = !menu_hidden;
        if(menu_hidden) {
          var dimensionValue = 'off';
        }else {
          var dimensionValue = 'on';
        }

        document.cookie = 'menu_hidden=' + menu_hidden

        if(ga === undefined) {
          console.log('undefined');
        }else {
          ga('set', 'dimension5', dimensionValue);
        };

    }, 100);

}, false);

document.getElementById('input-submit').addEventListener('click', function() {
    setTimeout(function() {

        // 検索キーワードの取得
        console.log(TRANSCRIPTS.getKeywords());
    });
}, false);

document.getElementById('txt-toggle').addEventListener('click', function() {
    setTimeout(function() {

        text_hidden = !text_hidden;
        if(text_hidden) {
          var dimensionValue = 'off';
        }else {
          var dimensionValue = 'on';
        }

        console.log('text_hidden')
        console.log(text_hidden)
        document.cookie = 'text_hidden=' + text_hidden

        if(ga === undefined) {
          console.log('undefined');
        }else {
          ga('set', 'dimension1', dimensionValue);
        };

    }, 150);
}, false);

document.getElementById('comment-toggle').addEventListener('click', function() {
    setTimeout(function() {

        comment_hidden = !comment_hidden;
        if(comment_hidden) {
          var dimensionValue = 'off';
        }else {
          var dimensionValue = 'on';
        }

        console.log('comment_hidden')
        console.log(comment_hidden)
        document.cookie = 'comment_hidden=' + comment_hidden

        if(ga === undefined) {
          console.log('undefined');
        }else {
          ga('set', 'dimension2', dimensionValue);
        };

    }, 200);
}, false);

document.getElementById('on-switch-media').addEventListener('click', function() {
    setTimeout(function() {

        // メディアのタイプの取得
        media_type = TRANSCRIPTS.getMediaType()
        console.log(media_type);
        document.cookie = 'media_type=' + media_type

        if(media_type==0) {
          var dimensionValue = 'image';
        }else if (media_type==1) {
          var dimensionValue = 'webpage';
        }else if (media_type==2) {
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

        search_id = $(event.currentTarget).closest('.grid-item').attr('data-searchId')
        related_content_id = $(event.currentTarget).closest('.grid-item').attr('data-relatedContentId')

        if (related_content_id){
            deleteContents(related_content_id)
        } else {
            deleteSearch(search_id)
        }

    }, 100);
});

window.addEventListener('scroll', function() {

    // スクロールが下部に来たらtrueを返します
    console.log(TRANSCRIPTS.getScrollBottomPosition());

    if (TRANSCRIPTS.getScrollBottomPosition()) {

      if (!is_loading) {
        loadPastContents();
      };

    };

}, false);

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

  if (cookies['menu_hidden'] == 'true') {
    document.getElementById('btn-menu').click();
  }

  // if (cookies['text_hidden'] == 'true') {
  //   // txt_toggle.click();
  //   document.getElementById('txt-toggle').click();
  // }

  if (cookies['comment_hidden'] == 'true') {
    document.getElementById('comment-toggle').click();
  }

  if (cookies['media_type'] == '1'){
    document.getElementById('btn-webpage').click();
  }else if (cookies['media_type'] == '2') {
    document.getElementById('btn-video').click();
  }

};

// window.addEventListener('load', init_setting, false);
