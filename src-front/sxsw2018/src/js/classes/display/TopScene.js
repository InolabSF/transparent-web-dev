
var _ = require('lodash')
var BaseApp = require('../utils/BaseApp')
// var {hasClass, getDOM, addClass, removeClass} = require('../utils/BaseUtils').utils
var data = require('../../../_config/data')

var Transcripts = require('./Transcripts');


class TopScene extends BaseApp {

    constructor() {
        super();

        this.transcripts = new Transcripts();
        transcripts_add = this.transcripts.add.bind(this.transcripts);

        $('#wrapper')
            .on('click', '.media-photo', this.showModal.bind(this))
            .on('click', '.modal-layer .btn-close01', this.hideModal.bind(this))
            .on('click', '.btn-bg-toggle', this.toggleBackgroundStyle.bind(this))
            .on('click', '.btn-add', this.add.bind(this));

        $(window)
            .on('keydown', this.keyDown.bind(this))
            .on('keyup', this.keyUp.bind(this));
    }

    add() {
    }

    showModal(event) {
        event.preventDefault();

        var modal = $('.modal-inner');
        var el = $(event.currentTarget);

        var src   = el.find('img').attr('src');
        var title = el.data('title');
        var desc  = el.data('desc');
        var url   = el.attr('href');

        if (src) {
            $('<img />', { src: src }).appendTo(modal);
        }
        if (title) {
            $('<p />', { class: 'title' }).text(title).appendTo(modal);
        }
        if (desc) {
            $('<p />', { class: 'desc' }).text(desc).appendTo(modal);
        }
        if (url) {
            $('<a />', { class: 'btn-style01', href: url, target: '_blank' })
                .text('Link').appendTo(modal);
        }

        $('.modal-layer').addClass('is-show');
    }

    hideModal(event) {
        event.preventDefault();

        // モーダルの中身削除
        $('.modal-inner').empty();

        $('.modal-layer').removeClass('is-show');
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
    };

    keyDown(event) {

        // キーボードのスペースが押されたら
        // スクロールするのを無効
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    };
}

module.exports = TopScene;
