
var _ = require('lodash')
var BaseApp = require('../utils/BaseApp')
// var {hasClass, getDOM, addClass, removeClass} = require('../utils/BaseUtils').utils
var data = require('../../../_config/data')


const COMMENT_BOX_SIZE = 500 / 1.5;
const RANGE = 200;
const MEDIA_SIZE = 400;


class TopScene extends BaseApp {

    constructor() {
        super();

        this.init();

        $('#wrapper')
            .on('click', '.media-photo', this.showModal.bind(this))
            .on('click', '.modal-layer .btn-close01', this.hideModal.bind(this));
    }

    init() {

        // ポストの数だけループ
        _.each(initial_transcripts, (data) => {
            var post = $('<div />', { class: 'post' });
            var comment = $('<div />', { class: 'comment' })
                .appendTo(post);
            var container = $('<div />', { class: 'media-container' })
                .appendTo(post);

            $('<div />', { class: 'comment-user-icon' })
                .appendTo(comment);
            $('<div />', { class: 'comment-text' })
                .text(data.text)
                .appendTo(comment);

            // ポストのDOMを追加
            $('.transparent-container').append(post);

            this.postPosition(post);
            this.mediaRandomPosition(post, data);
        });
    }

    /**
     * .commentのポジションを設定
     * @param [DOM object] el: postのDOM
     */
    postPosition(el) {
        var x = 0;
        var y = 0;
        var range = _.random(-RANGE, RANGE);

        x = (-COMMENT_BOX_SIZE / 2) + range;
        y = 0;//_.random(30, 40) - 20 + 'vh';

        $(el).find('.comment').css({ marginTop: y, marginLeft: x });
    }

    /**
     * メディアのポジションをランダムに配置
     * @param [DOM object] el: postのDOM
     */
    mediaRandomPosition(el, data) {
        var array = [];

        _.each(data.related_contents, (d) => {
            var h = {};

            if (d.content_type === 'webpage') {
                var h = $('<a />', {
                    href: d.url,
                    'data-title': d.title,
                    'data-desc': d.desc,
                    target: '_blank'
                });
                $('<img />', { src: d.img_url })
                    .appendTo(h);
            } else {
                h = $('<img />', { src: d.img_url });
            }

            array.push(h);
        });

        // arrayに入れたDOM配列をランダム配置
        $(el).find('.media-container').randomElements(array, {
                width: MEDIA_SIZE,
                // stageHeight: MEDIA_SIZE / 2,
                min: MEDIA_SIZE / 3,
                className: 'media-photo',
                adjustment: MEDIA_SIZE / 6,
                tryCount: 999
            });
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
        $('.modal-inner').empty()
        $('.modal-layer').removeClass('is-show');
    }
}

module.exports = TopScene;
