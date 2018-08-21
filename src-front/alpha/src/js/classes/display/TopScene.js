
var _ = require('lodash')
var BaseApp = require('../utils/BaseApp')
// var {hasClass, getDOM, addClass, removeClass} = require('../utils/BaseUtils').utils
var data = require('../../../_config/data')

var Transcripts = require('./Transcripts');


class TopScene extends BaseApp {

    constructor() {
        super();

        this.transcripts = new Transcripts();

        this.modalFlg = false;
        this.isDraggable = false;

        $('#wrapper')
            .on('click', '.btn-menu01', this.menuToggle.bind(this))
            .on('click', '.media-photo', this.clickDisable.bind(this))
            .on('click', '.modal-layer .modal-back', this.hideModal.bind(this))
            .on('click', '.btn-bg-toggle', this.toggleBackgroundStyle.bind(this))
            .on('mousedown', '.media-photo', this.onDragCatch.bind(this))

        $(window)
            .on('keydown', this.keyDown.bind(this))
            .on('keyup', this.keyUp.bind(this))
            .on('mouseup', this.onDragRelease.bind(this))
            .on('mousemove', this.onDragMove.bind(this))

        TRANSCRIPTS.prependContents = this.transcripts.prependContents.bind(this.transcripts);
        TRANSCRIPTS.appendContents = this.transcripts.appendContents.bind(this.transcripts);
        TRANSCRIPTS.setRecordingText = this.transcripts.setRecordingText.bind(this.transcripts);
        TRANSCRIPTS.toggleRecordhing = this.transcripts.toggleRecordhing.bind(this.transcripts);
        TRANSCRIPTS.getRecordingStatus = this.transcripts.getRecordingStatus.bind(this.transcripts);
        TRANSCRIPTS.getMediaType = this.transcripts.getMediaType.bind(this.transcripts);
        TRANSCRIPTS.getKeywords = this.transcripts.getKeywords.bind(this.transcripts);
        TRANSCRIPTS.getScrollBottomPosition = this.transcripts.getScrollBottomPosition.bind(this.transcripts);
        TRANSCRIPTS.setMediaText = this.transcripts.setMediaText.bind(this.transcripts);
        TRANSCRIPTS.setMediaType = this.transcripts.setMediaType.bind(this.transcripts);
        TRANSCRIPTS.addContents = this.transcripts.addContents.bind(this.transcripts);
        TRANSCRIPTS.addKeywordList = this.transcripts.addKeywordList.bind(this.transcripts);
        TRANSCRIPTS.removeKeywordList = this.transcripts.removeKeywordList.bind(this.transcripts);

        TRANSCRIPTS.setMenu = this.setMenu.bind(this);
        TRANSCRIPTS.onDraggable = this.onDraggable.bind(this);
        TRANSCRIPTS.offDraggable = this.offDraggable.bind(this);
    }

    menuToggle() {
        if ($('.btn-menu01').hasClass('is-active')) {

            // 閉じる
            $('.btn-menu01').removeClass('is-active');
            $('#global-menu').removeClass('is-active');
        } else {

            // 開く
            $('.btn-menu01').addClass('is-active');
            $('#global-menu').addClass('is-active');
        }
    }

    setMenu(flg) {
        if (flg) {

            // 閉じる
            $('.btn-menu01').removeClass('is-active');
            $('#global-menu').removeClass('is-active');
        } else {

            // 開く
            $('.btn-menu01').addClass('is-active');
            $('#global-menu').addClass('is-active');
        }
    }

    showModal(event) {
        event.preventDefault();

        if ($(event.target).hasClass('btn-close02')) {
            return false;
        }

        if (this.modalFlg) {
            return false;
        }

        this.modalFlg = true;

        var modal = $('.modal-inner');
        var el = $(event.currentTarget);

        var src   = el.find('img').attr('src');
        var title = el.data('title');
        var desc  = el.data('desc');
        var url   = el.attr('href');

        var info = $('<div />', { class: 'info' }).appendTo(modal);

        if (src) {
            $('<div />', {
                style: 'background-image: url(' + src + ');',
                class: 'img'
            }).prependTo(modal);
        }
        if (title) {
            $('<p />', { class: 'title' }).text(title).appendTo(info);
        }
        if (desc) {
            $('<p />', { class: 'desc' }).text(desc).appendTo(info);
        }
        if (url) {
            $('<a />', { class: 'btn-style01', href: url, target: '_blank' })
                .text('Link').appendTo(info);
        }

        modal.attr({
            'data-id': $(el).attr('data-id'),
            'data-searchId': $(el).attr('data-searchid'),
            'data-relatedContentId': $(el).attr('data-relatedcontentid')
        });

        $('.modal-layer').addClass('is-show');
    }

    hideModal(event) {
        event.preventDefault();

        // モーダルの中身削除
        $('.modal-inner').empty().attr({
            'data-id': '',
            'data-searchId': '',
            'data-relatedContentId': ''
        });

        $('.modal-layer').removeClass('is-show');

        this.modalFlg = false;
    }

    toggleBackgroundStyle(event) {
        event.preventDefault();

        if ($('.bg').hasClass('black')) {
            $('.bg').removeClass('black');
        } else {
            $('.bg').addClass('black');
        }
    }

    keyUp(event) {

        // キーボードのスペースが押されたら
        if (event.keyCode === 32) {
            this.toggleBackgroundStyle(event);
        }
    }

    keyDown(event) {

        // キーボードのスペースが押されたら
        // スクロールするのを無効
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    }


    onDragCatch(event) {
        event.preventDefault();

        this.move_flg = true;
        this.el = event.currentTarget;
        this.move_start_x = event.clientX - parseInt(this.el.style.left.replace("px",""));
        this.move_start_y = event.clientY - parseInt(this.el.style.top.replace("px",""));

        this.downTime = new Date().getTime();
        this.event = event;

        return false;
    }

    onDragMove(event) {
        if (!this.isDraggable) {
            return false;
        }

        if (this.move_flg) {
            var left = (event.clientX - this.move_start_x) + "px";
            var top = (event.clientY - this.move_start_y) + "px";
            this.el.style.left = left;
            this.el.style.top = top;
        }
        return false;
    }

    onDragRelease(event) {
        event.preventDefault();

        var upTime = new Date().getTime();

        if (upTime - this.downTime < 200) {
            this.showModal(this.event);
        }

        this.el = {};
        this.move_flg = false;
        return false;
    }

    onDraggable() {
        this.isDraggable = true;
        $('.media-photo').css('cursor', 'move');
        return this.isDraggable;
    }

    offDraggable() {
        this.isDraggable = false;
        $('.media-photo').css('cursor', 'pointer');
        return this.isDraggable;
    }

    // クリックイベントの削除用
    clickDisable(event) {
        event.preventDefault();
        return false;
    }

}

module.exports = TopScene;
