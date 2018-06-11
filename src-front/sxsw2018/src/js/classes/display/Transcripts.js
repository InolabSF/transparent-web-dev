
var _ = require('lodash')
var BaseApp = require('../utils/BaseApp')
// var {hasClass, getDOM, addClass, removeClass} = require('../utils/BaseUtils').utils
var data = require('../../../_config/data')


const COMMENT_BOX_SIZE = 500 / 1.5;
const RANGE = 200; // .commentボックスのズレ具合
// const MEDIA_MAX_SIZE = 350; // ランダム配置される画像の最大サイズ
// const MEDIA_MIN_SIZE = MEDIA_MAX_SIZE / 3; // ランダム配置される画像の最小サイズ
const TRY_COUNT = 999; // 配置が重なっていた時に再度ランダムをやり直す回数

class Transcripts extends BaseApp {

    constructor() {
        super();

        this.init();
    }

    /**
     * 最初のトランスクリプト生成
     */
    init() {
        var length = initial_transcripts.length - 1;
        var index = 0;

        // ポストの数だけループ
        var loop = () => {
            var data = initial_transcripts[index];
            var post = this.createPost(data);

            // ポストのDOMを追加
            $('.transparent-container').append(post);

            this.postPosition(post);

            if (data.has_content) {
                this.mediaRandomPosition(post, data);
            }

            setTimeout(() => {
                this.transit(post);
            }, 100);

            if (index < length) {
                index++;
                setTimeout(loop, 200);
            }
        };

        setTimeout(loop, 1000);
    }

    /**
     * トランスクリプト追加
     * @param [array] data: 追加用オブジェクト配列
     */
    add(addData) {
        var length = addData.length - 1;
        var index = 0;

        // ポストの数だけループ
        var loop = () => {
            var data = initial_transcripts[index];
            var post = this.createPost(data);

            // ポストのDOMを追加
            $('.transparent-container').prepend(post);

            this.postPosition(post);

            if (data.has_content) {
                this.mediaRandomPosition(post, data);
            }

            setTimeout(() => {
                this.transit(post);
            }, 100);

            if (index < length) {
                index++;
                setTimeout(loop, 200);
            }
        };

        setTimeout(loop, 1000);
    }

    createPost(data) {
        var klass = '';

        if (data.has_content) {
            klass = '';
        } else {
            klass = ' no-content';
        }

        var post = $('<div />', { class: 'post' + klass });
        var comment = $('<div />', { class: 'comment' })
            .appendTo(post);
        var container = $('<div />', { class: 'media-container' })
            .appendTo(post);

        $('<div />', { class: 'comment-user-icon' })
            .appendTo(comment);
        $('<div />', { class: 'comment-text' })
            .text(data.text)
            .appendTo(comment);

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
    mediaRandomPosition(post, data) {
        var array = [];

        _.each(data.related_contents, (d) => {
            var h = {};

            // webpageだったらリンクを貼る
            if (d.content_type === 'webpage') {
                var h = $('<a />', {
                    href: d.url,
                    'data-title': d.title,
                    'data-desc': d.desc,
                    target: '_blank'
                });
                $('<img />', { src: d.img_url, class: 'img' })
                    .appendTo(h);
                $('<img />', { src: `http://www.google.com/s2/favicons?domain=${d.source}`, class: 'favicon' })
                    .appendTo(h);
            } else {
                h = $('<img />', { src: d.img_url, class: 'img' });
            }

            array.push(h);
        });

        // arrayに入れたDOM配列をランダム配置
        $(post).find('.media-container').randomElements(array, {
            width: MEDIA_MAX_SIZE,
            // stageHeight: MEDIA_MAX_SIZE / 2,
            min: MEDIA_MIN_SIZE,
            className: 'media-photo',
            adjustment: MEDIA_MAX_SIZE / 6,
            tryCount: TRY_COUNT
        });
    }

    transit(post) {
        $(post).addClass('transit');
    }
}

module.exports = Transcripts;
