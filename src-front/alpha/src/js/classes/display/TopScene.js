
var _ = require('lodash')
var BaseApp = require('../utils/BaseApp')
// var {hasClass, getDOM, addClass, removeClass} = require('../utils/BaseUtils').utils
var data = require('../../../_config/data')


class TopScene extends BaseApp {

    constructor() {
        super();

        // this.init();

        this.firstFlg = true;
        this.keywords = [];
        this.scrollBottomPos = false;
        this.recordingStatus = false;
        this.commentCard = true;
        this.mediaText = true;
        this.masonryOpt = {
            itemSelector: '.grid',
            stamp: '.post-keyword'
        };

        $('#wrapper')
            .on('click', '.btn-menu01', this.menuToggle.bind(this))
            .on('click', '.on-txt-hidden', this.mediaTextToggle.bind(this))
            .on('click', '.on-card-hidden', this.mediaCardToggle.bind(this))
            .on('click', '.on-switch-media .media', this.mediaSwitch.bind(this))
            .on('click', '.input-submit', this.addKeywordList.bind(this))
            .on('click', '.keyword-list .list-item', this.removeKeywordList.bind(this))
            .on('click', '#transparent-container .post-media   .btn-close02', this.removeMedia.bind(this))
            .on('click', '#transparent-container .post-keyword .btn-close02', this.removeMediaSection.bind(this))
            .on('click', '.post-media', this.showDetail.bind(this))
            .on('click', '.btn-close01', this.hideDetail.bind(this))
            .on('click', '.btn-arrow01.right', this.next.bind(this))
            .on('click', '.btn-arrow01.left', this.prev.bind(this))

        $(window)
            .on('scroll', this.onScroll.bind(this));

        TRANSCRIPTS.appendContents = this.appendContents.bind(this);
        TRANSCRIPTS.prependContents = this.prependContents.bind(this);
        TRANSCRIPTS.setRecordingText = this.setRecordingText.bind(this);
        TRANSCRIPTS.getKeywords = this.getKeywords.bind(this);
        TRANSCRIPTS.toggleRecordhing = this.toggleRecordhing.bind(this);
        TRANSCRIPTS.getMediaType = this.getMediaType.bind(this);
        TRANSCRIPTS.getScrollBottomPosition = this.getScrollBottomPosition.bind(this);
        TRANSCRIPTS.getRecordingStatus = this.getRecordingStatus.bind(this);
        TRANSCRIPTS.addContents = this.addContents.bind(this);
        // TRANSCRIPTS.imageNotFound = this.imageNotFound.bind(this);
    }

    init() {
        $.get(TRANSCRIPTS.API_URI, (data) => {
            var length = data.searches.length - 1;
            var index = 0;

            for (var i = 0; i < length; i++) {

                var post = this.createKeywordArea(data, i);
                $('#transparent-container').append(post);
            }

            this.isStamped = false;
            this.initMasonry();
        });
    }

    appendContents(data) {
        var length = data.searches.length;
        var index = 0;

        for (var i = 0; i < length; i++) {

            var post = this.createKeywordArea(data, i);
            $('#transparent-container').append(post);
        }

        this.isStamped = false;

        this.initMasonry();
        this.masonry.masonry('reloadItems');
    }

    prependContents(data) {
        var length = data.searches.length;
        var index = 0;

        for (var i = 0; i < length; i++) {

            var post = this.createKeywordArea(data, i);
            $('#transparent-container').prepend(post);
        }

        this.isStamped = false;

        this.initMasonry();
        this.masonry.masonry('reloadItems');
    }

    addContents(related_contents) {
        var length = related_contents.length;

        _.each(related_contents, (data1) => {
            var id1 = parseInt(data1.search_id, 10);

            _.each($('.post-keyword'), (data2) => {

                var id2 = parseInt($(data2).data('searchid'), 10);
                var container = $(data2).closest('.media-container');

                if (id1 === id2) {

                    // テキスト表示の出しわけ
                    var klass = '';
                    if (!this.mediaText) {
                        klass = ' hidden-text';
                    }

                    var post = $('<a />')
                        .attr({ href: data1.url, class: 'grid post-media grid-item' + klass, target: '_blank', 'data-searchId': data1.search_id, 'data-relatedContentId': data1.id });

                    var img = $('<div />', { class: 'wrap' })
                        .appendTo(post);
                    $('<img />', { src: data1.img_url, class: 'img', alt: data1.desc })
                        .appendTo(img);
                    $('<img />', { src: `http://www.google.com/s2/favicons?domain=${data1.source}`, class: 'favicon' })
                        .appendTo(img);

                    $('<p />', { class: 'txt' })
                        .text(data1.title)
                        .appendTo(post);

                    $('<button />', { class: 'btn-close02' })
                        .appendTo(post);


                    container.append(post).masonry('appended', post);
                    this.masonry.masonry('reloadItems');
                }

            });
        });

        this.reLayout();
    }

    createKeywordArea(data, index) {
        var searches = data.searches[index];
        var searcheId1 = searches.id;

        var area = $('<div />', { class: 'keyword-area' });
        var container = $('<div />', { class: 'media-container' })
            .appendTo(area);
        var detail = $('<div />', { class: 'detail-area' })
            .appendTo(area);
        $('<button />', { class: 'btn-close01' })
            .appendTo(detail);
        $('<button />', { class: 'btn-arrow01 right' })
            .appendTo(detail);
        $('<button />', { class: 'btn-arrow01 left' })
            .appendTo(detail);

        // キーワードの連結
        var words = [];
        for (var i = 0, l = searches.words.length; i < l; i++) {
            words += searches.words[i];

            if (i !== l - 1) {
                words += ' + ';
            }
        }

        // コメントカード
        var cardStyle;
        if (!this.commentCard) {
            cardStyle = { display: 'none' };
        } else {
            cardStyle = { display: 'block' };
        }

        var postKeyword = $('<p />', { class: 'post-keyword grid-item', 'data-searchId': searcheId1 })
            .css(cardStyle)
            .text(words)
            .appendTo(container);
        $('<button />', { class: 'btn-close02' })
            .appendTo(postKeyword);


        // 画像コンテンツ
        for (var i = 0, l = data.related_contents.length; i < l; i++) {
            var d = data.related_contents[i];

            // search_idが一致したら
            if (d.search_id === searcheId1) {

                // テキスト表示の出しわけ
                var klass = '';
                if (!this.mediaText) {
                    klass = ' hidden-text';
                }

                var post = $('<a />')
                    .attr({ href: d.url, class: 'grid post-media grid-item' + klass, target: '_blank', 'data-searchId': d.search_id, 'data-relatedContentId': data.related_contents[i].id })
                    .appendTo(container);

                var img = $('<div />', { class: 'wrap' })
                        .appendTo(post);
                $('<img />', { src: d.img_url, class: 'img', alt: d.desc, onerror: this.imageNotFound })
                    .appendTo(img);
                $('<img />', { src: `http://www.google.com/s2/favicons?domain=${d.source}`, class: 'favicon' })
                    .appendTo(img);

                var title = d.title;
                var count = 60;

                if(title.length > count){
                    title = title.substr(0, count);
                    title += "...";
                }

                $('<p />', { class: 'txt' })
                    .text(title)
                    .appendTo(post);

                $('<button />', { class: 'btn-close02' })
                    .appendTo(post);

            }
        }

        return area;
    }

    showDetail(event) {
        event.preventDefault();

        // クローズボタンだったら抜ける
        if ($(event.target).hasClass('btn-close02')) {
            return false
        }

        var post = $(event.currentTarget).closest('.post-media');

        this.detailChange(event, post);
    }

    detailChange(event, post) {

        // $(event.currentTarget).closest('.keyword-area').find('.detail-area').removeClass('is-active');
        $(event.currentTarget).closest('.keyword-area').find('.detail-area').find('.inner').remove();

        var img = post.find('.img').attr('src');
        var url = post.attr('href');
        var desc = post.find('.img').attr('alt');
        var title = post.find('.txt').text();


        $(event.currentTarget).closest('.keyword-area').find('.post-media').removeClass('is-active');
        post.addClass('is-active');


        var detail = $(event.currentTarget).closest('.keyword-area').find('.detail-area');
        var inner = $('<div />', { class: 'inner' })
            .appendTo(detail);
        $('<div />', { class: 'img', style: `background-image: url(${img})` })
            .appendTo(inner);

        var info = $('<div />', { class: 'info' })
            .appendTo(inner);
        $('<p />', { class: 'title' })
            .text(title)
            .appendTo(info);
        $('<p />', { class: 'desc' })
            .text(desc)
            .appendTo(info);
        $('<a />', { class: 'link btn-style01', target: '_blank', href: url })
            .text('LINK')
            .appendTo(info);

        detail.addClass('is-active');

        $('body, html').stop().animate({ scrollTop: detail.offset().top - 100 }, 500, 'swing');
    }

    hideDetail(event) {
        event.preventDefault();

        $(event.currentTarget).closest('.detail-area').removeClass('is-active');
        $('body, html').stop().animate({ scrollTop: $(event.currentTarget).closest('.keyword-area').offset().top - 100 }, 500, 'swing');
    }

    next(event) {
        event.preventDefault();

        var area = $(event.target).closest('.keyword-area');
        var post = area.find('.post-media.is-active').next('.post-media');

        if (!post.attr('href')) {
            post = area.find('.post-media').eq(0);
        }

        this.detailChange(event, post);
    }

    prev(event) {
        event.preventDefault();

        var area = $(event.target).closest('.keyword-area');
        var post = area.find('.post-media.is-active').prev('.post-media');

        var len = area.find('.post-media').length - 1;

        if (!post.attr('href')) {
            post = area.find('.post-media').eq(len);
        }

        this.detailChange(event, post);
    }

    removeMedia(event) {
        event.preventDefault();

        // $(event.currentTarget).closest('.grid-item').remove();
        this.masonry.masonry('remove', $(event.currentTarget).closest('.grid-item'));
        this.reLayout();
    }

    removeMediaSection(event) {
        event.preventDefault();

        var section = $(event.currentTarget).closest('.keyword-area');

        section.fadeOut(() => {
            section.remove();
        });
        this.reLayout();
    }

    initMasonry() {
        this.firstFlg = false;

        this.masonry = $('.media-container').masonry(this.masonryOpt);

        setInterval(() => {
            this.reLayout();
        }, 1500);
    }

    reLayout(stamp) {
        this.masonry.masonry('reloadItems');
        this.masonry.masonry('layout');
    }

    mediaTextToggle(event) {
        if ($('.post-media').hasClass('hidden-text')) {

            // テキスト表示
            this.mediaText = true;
            $('.post-media').removeClass('hidden-text');
            $(event.currentTarget).removeClass('is-active');
        } else {

            // テキスト非表示
            this.mediaText = false;
            $('.post-media').addClass('hidden-text');
            $(event.currentTarget).addClass('is-active');
        }

        setTimeout(() => {
            this.reLayout();
        }, 100);
    }

    mediaCardToggle(event) {
        if ($('.post-keyword').hasClass('is-active')) {

            // 閉じる
            $(event.currentTarget).removeClass('is-active');

            $('.post-keyword').fadeIn(200, () => {
                $('.post-keyword').removeClass('is-active');
                this.commentCard = true;
                this.reLayout(true);
            });
        } else {

            // 開く
            $('.post-keyword').addClass('is-active');
            $(event.currentTarget).addClass('is-active');

            $('.post-keyword').fadeOut(200, () => {
                this.reLayout(true);
                this.commentCard = false;
            });
        }

    }

    mediaSwitch(event) {
        var el = $(event.currentTarget);
        el.closest('.btn-toggle02').find('.media').removeClass('is-active');
        el.addClass('is-active');

        this.mediaType = parseInt(el.data('type'), 10);
    }

    getMediaType() {
        return this.mediaType;
    }

    addKeywordList(event) {
        event.preventDefault();

        var val = $('.input-keyword').val();

        if (val) {
            this.keywords.push(val);
            $('.keyword-list').append('<div class="list-item">' + val + '</div>');
        }

        $('.input-keyword').val('');
    }

    removeKeywordList(event) {
        event.preventDefault();

        var index = this.keywords.indexOf($(event.currentTarget).text());
        this.keywords.splice(index, 1);
        $(event.currentTarget).remove();
    }

    getKeywords() {
        return this.keywords;
    }

    menuToggle() {
        if ($('.btn-menu01').hasClass('is-active')) {

            // 閉じる
            $('.btn-menu01').removeClass('is-active');
            $('#global-menu').removeClass('is-active');
            $('#transparent-container').removeClass('menu-is-active');
        } else {

            // 開く
            $('.btn-menu01').addClass('is-active');
            $('#global-menu').addClass('is-active');
            $('#transparent-container').addClass('menu-is-active');
        }

        setTimeout(() => {
            this.reLayout();
        }, 100);
    }

    toggleRecordhing() {

        if ($('.btn-recording').hasClass('rec')) {
            $('.btn-recording').removeClass('rec');
            $('.btn-recording').addClass('recording');

            this.recordingStatus = true;
        } else {
            $('.btn-recording').addClass('rec');
            $('.btn-recording').removeClass('recording');

            this.recordingStatus = false;
        }
    }

    setRecordingText(text) {
        $('.txt-recording').text(text);
    }

    getRecordingStatus() {
        return this.recordingStatus;
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
}

module.exports = TopScene;
