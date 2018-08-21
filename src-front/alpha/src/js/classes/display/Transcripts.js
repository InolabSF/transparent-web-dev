
var _ = require('lodash')
var BaseApp = require('../utils/BaseApp')
// var {hasClass, getDOM, addClass, removeClass} = require('../utils/BaseUtils').utils
var data = require('../../../_config/data')


const COMMENT_BOX_SIZE = 500 / 1.5;
const RANGE = 500; // .commentボックスのズレ具合
// const TRANSCRIPTS.MEDIA_MAX_SIZE = 350; // ランダム配置される画像の最大サイズ
// const TRANSCRIPTS.MEDIA_MIN_SIZE = TRANSCRIPTS.MEDIA_MAX_SIZE / 3; // ランダム配置される画像の最小サイズ
const TRY_COUNT = 999; // 配置が重なっていた時に再度ランダムをやり直す回数

class Transcripts extends BaseApp {

    constructor() {
        super();

        this.init();

        this.scrollBottomPos = false;
        this.mediaText = true;
        this.keywords = [];
        this.recordingStatus = false;
        this.zIndex = 20;
        this.move_flg = false;

        $('#wrapper')
            .on('click', '.on-switch-media .media', this.switchMediaType.bind(this))
            .on('click', '.input-submit', this.onSubmitKeyword.bind(this))
            .on('click', '.keyword-list .list-item', this.onRemoveKeywordList.bind(this))
            .on('click', '.on-txt-hidden', this.toggleMediaText.bind(this))
            .on('click', '.media-photo .btn-close02', this.removeMedia.bind(this))
            .on('click', '.comment .btn-close02', this.removeMediaSection.bind(this))
            .on('mouseenter', '.media-photo', this.zIndexNumbering.bind(this))

        $(window)
            .on('scroll', this.onScroll.bind(this))
    }

    /**
     * 最初のトランスクリプト生成
     */
    init() {

        if (!TRANSCRIPTS.API_URI) {
            return false;
        }

        $.get(TRANSCRIPTS.API_URI, (data) => {
            var length = data.searches.length - 1;
            var index = 0;

            var loop = () => {
                var post = this.createPost(data, index);

                // ポストのDOMを追加
                $('#transparent-container').append(post);

                this.postPosition(post);
                this.mediaRandomPosition(post, data, index);

                setTimeout(() => {
                    this.transit(post);
                }, 100);

                if (index < length) {
                    index++;
                    setTimeout(loop, 100);
                }
            }

            setTimeout(loop, 2000);
        });
    }

    /**
     * トランスクリプト追加
     * @param [array] data: 追加用オブジェクト配列
     */
    prependContents(data) {
        var length = data.searches.length - 1;
        var index = 0;

        // ポストの数だけループ
        var loop = () => {
            var post = this.createPost(data, index);

            // ポストのDOMを追加
            $('#transparent-container').prepend(post);

            this.postPosition(post);
            this.mediaRandomPosition(post, data, index);

            setTimeout(() => {
                this.transit(post);
            }, 100);

            if (index < length) {
                index++;
                setTimeout(loop, 200);
            }
        };

        setTimeout(loop, 100);
    }

    appendContents(data) {
        var length = data.searches.length - 1;
        var index = 0;

        // ポストの数だけループ
        var loop = () => {
            var post = this.createPost(data, index);

            // ポストのDOMを追加
            $('#transparent-container').append(post);

            this.postPosition(post);
            this.mediaRandomPosition(post, data, index);

            setTimeout(() => {
                this.transit(post);
            }, 100);

            if (index < length) {
                index++;
                setTimeout(loop, 200);
            }
        };

        setTimeout(loop, 100);
    }

    // related_contentsだけ追加
    addContents(related_contents) {
        var length = related_contents.length;

        _.each(related_contents, (data1) => {
            var id1 = parseInt(data1.search_id, 10);

            _.each($('.comment'), (data2, i) => {

                var id2 = parseInt($(data2).data('searchid'), 10);
                var container = $(data2).closest('.post').find('.media-container');

                if (id1 === id2) {

                    // テキスト表示の出しわけ
                    var klass = '';
                    if (!this.mediaText) {
                        klass = ' is-hidden';
                    }

                    // webpageだったらリンクを貼る
                    var h = $('<a />', {
                        href: data1.url,
                        class: 'media-photo',
                        'data-title': data1.title,
                        'data-desc': data1.desc,
                        'data-id': data1.transcript_id,
                        target: '_blank',
                        'data-searchId': data1.search_id,
                        'data-relatedContentId': data.id
                    })
                    .css({
                        width: _.random(TRANSCRIPTS.MEDIA_MAX_SIZE, TRANSCRIPTS.MEDIA_MIN_SIZE),
                        left: _.random(50, 700),
                        top: _.random(50, 700)
                    });
                    $('<img />', { src: data1.img_url, class: 'img', onerror: this.imageNotFound })
                        .appendTo(h);
                    $('<img />', { src: `http://www.google.com/s2/favicons?domain=${data1.source}`, class: 'favicon' })
                        .appendTo(h);
                    $('<button />', { class: 'btn-close02' })
                        .appendTo(h);

                    container.append(h[0]);
                }

            });
        });
    }

    createPost(data, index) {
        var searches = data.searches[index];
        var searcheId1 = searches.id;
        var klass = '',
            klass2 = '';

        // if (!data.has_content) {
        //     klass = ' no-content';
        // }

        if (!this.mediaText) {
            klass2 = ' is-hidden';
        }

        // エリア作成
        var post = $('<div />', { class: 'post' + klass });
        var container = $('<div />', { class: 'media-container' })
            .appendTo(post);

        // キーワードの連結
        var words = [];
        for (var i = 0, l = searches.words.length; i < l; i++) {
            words += searches.words[i];

            if (i !== l - 1) {
                words += ' + ';
            }
        }

        // コメントカード作成
        var comment = $('<div />', { class: 'comment' + klass2, 'data-searchId': searcheId1 })
            .appendTo(post);
        $('<div />', { class: 'comment-text' })
            .text(words)
            .appendTo(comment);
        $('<button />', { class: 'btn-close02' })
            .appendTo(comment);




        function dateFormat(date) {

            // UTC
            var h = date.getUTCHours();
            var m = date.getUTCMinutes();
            var s = date.getUTCSeconds();

            // UTCじゃない
            // var h = date.getHours();
            // var m = date.getMinutes();
            // var s = date.getSeconds();

            h = ('0' + h).slice(-2);
            m = ('0' + m).slice(-2);
            s = ('0' + s).slice(-2);

            // フォーマット整形済みの文字列を戻り値にする
            return `${h}:${m}:${s}`;
        }

        // タイムスタンプ作成
        $('<div />', { class: 'time-stamp' })
            .text(dateFormat(new Date(searches.created_at)))
            .appendTo(post)

        return post;
    }

    /**
     * .commentのポジションを設定
     * @param [DOM object] el: postのDOM
     */
    postPosition(post) {
        var x = 0;
        var y = 0;
        var range = _.random(-RANGE, RANGE);

        x = (-COMMENT_BOX_SIZE / 2) + range;
        y = 0;//_.random(30, 40) - 20 + 'vh';

        $(post).find('.comment').css({ marginTop: y, marginLeft: x });
    }

    /**
     * メディアのポジションをランダムに配置
     * @param [DOM object] el: postのDOM
     */
    mediaRandomPosition(post, data, index) {
        var searches = data.searches[index];
        var searcheId1 = searches.id;
        var array = [];

        _.each(data.related_contents, (d, i) => {
            var h = {};

            // search_idが一致したら
            if (d.search_id === searcheId1) {

                var h = $('<a />', {
                    href: d.url,
                    'data-title': d.title,
                    'data-desc': d.desc,
                    target: '_blank',
                    'data-id': d.transcript_id,
                    'data-searchId': d.search_id,
                    'data-relatedContentId': data.related_contents[i].id
                });
                $('<img />', { src: d.img_url, class: 'img', onerror: this.imageNotFound })
                    .appendTo(h);
                $('<img />', { src: `http://www.google.com/s2/favicons?domain=${d.source}`, class: 'favicon' })
                    .appendTo(h);
                $('<button />', { class: 'btn-close02' })
                    .appendTo(h);

                array.push(h);
            }
        });

        // arrayに入れたDOM配列をランダム配置
        $(post).find('.media-container').randomElements(array, {
            width: TRANSCRIPTS.MEDIA_MAX_SIZE,
            // stageHeight: TRANSCRIPTS.MEDIA_MAX_SIZE / 2,
            min: TRANSCRIPTS.MEDIA_MIN_SIZE,
            className: 'media-photo',
            adjustment: 30,
            tryCount: TRY_COUNT
        });
    }

    transit(post) {
        $(post).addClass('transit');
    }

    setRecordingText(text) {
        $('.txt-recording').text(text);
    }

    toggleRecordhing() {

        if ($('.recording-area').hasClass('rec')) {
            $('.recording-area').removeClass('rec');
            $('.recording-area').addClass('recording');

            this.recordingStatus = true;
        } else {
            $('.recording-area').addClass('rec');
            $('.recording-area').removeClass('recording');

            this.recordingStatus = false;
        }
    }

    getRecordingStatus() {
        return this.recordingStatus;
    }

    onSubmitKeyword(event) {
        event.preventDefault();
        var val = $('.input-keyword').val();

        this.addKeywordList(val)
    }

    addKeywordList(val) {

        if (val) {
            this.keywords.push(val);
            $('.keyword-list').append('<div class="list-item">' + val + '</div>');
        }

        $('.input-keyword').val('');
    }

    onRemoveKeywordList(event) {
        event.preventDefault();

        this.removeKeywordList($(event.currentTarget).text());
    }

    removeKeywordList(text) {

        // キーワードリスト内から内部的に削除
        var index = this.keywords.indexOf(text);
        this.keywords.splice(index, 1);

        _.each($('.keyword-list').find('.list-item'), (el) => {
            if ($(el).text() === text) {
                $(el).remove();

                return false;
            }
        });
    }

    getKeywords() {
        return this.keywords;
    }

    switchMediaType(event) {
        var el = $(event.currentTarget);
        el.closest('.btn-toggle02').find('.media').removeClass('is-active');
        el.addClass('is-active');

        this.mediaType = parseInt(el.data('type'), 10);
    }

    setMediaType(type) {

        var el = $('.on-switch-media').find('.media');
        el.removeClass('is-active');

        if (type === 0) {
            el.eq(0).addClass('is-active');
        } else if (type === 1) {
            el.eq(1).addClass('is-active');
        } else if (type === 2) {
            el.eq(2).addClass('is-active');
        } else {
            return false;
        }

        this.mediaType = type;
    }

    getMediaType() {
        return this.mediaType;
    }

    getKeywords() {
        return this.keywords;
    }

    toggleMediaText(event) {
        if ($('.comment').hasClass('is-hidden')) {

            // テキスト表示
            this.mediaText = true;
            $('.comment').removeClass('is-hidden');
            $(event.currentTarget).removeClass('is-active');
        } else {

            // テキスト非表示
            this.mediaText = false;
            $('.comment').addClass('is-hidden');
            $(event.currentTarget).addClass('is-active');
        }
    }

    setMediaText(flg) {
        if (flg) {

            // テキスト表示
            this.mediaText = true;
            $('.comment').removeClass('is-hidden');
            $(event.currentTarget).removeClass('is-active');
        } else {

            // テキスト非表示
            this.mediaText = false;
            $('.comment').addClass('is-hidden');
            $(event.currentTarget).addClass('is-active');
        }
    }

    removeMedia(event) {
        event.preventDefault();

        $(event.currentTarget).closest('.media-photo').remove();
    }

    removeMediaSection(event) {
        event.preventDefault();

        var section = $(event.currentTarget).closest('.post');

        section.fadeOut(() => {
            section.remove();
        });
    }

    onScroll() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();

        if ((scrollHeight - scrollPosition) / scrollHeight <= 0.05) {

            //スクロールの位置が下部5%の範囲に来た場合
            this.scrollBottomPos = true;
        } else {
            this.scrollBottomPos = false;
        }
    }

    getScrollBottomPosition() {
        return this.scrollBottomPos;
    }

    imageNotFound(event) {
        var img = new Image();
        img.src = $(this).attr('src');

        img.onerror = () => {
            $(this).attr('src', 'https://res.cloudinary.com/negic/image/upload/v1528273682/img_notfound.png');
        }

    }

    zIndexNumbering(event) {
        $(event.currentTarget).css('z-index', this.zIndex);
        this.zIndex++;
    }
}

module.exports = Transcripts;
