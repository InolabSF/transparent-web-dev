
var _ = require('underscore')
var EventDispatcher = require('../events/EventDispatcher');
var {getHeight, getDOM, addClass, removeClass, hasClass} = require('./BaseUtils').utils
var {AU_HEADER, STEP_HEADER, ISSUN_SLIDER, NORMAL_SLIDER, UI_BUTTONS, COMPLETE_BUTTON} = require('../config/constants');


/**
 * 基本機能を与える継承用クラス
 */
class BaseApp extends EventDispatcher {

    constructor() {
        super();

        this.setFPS(30);

        // window.addEventListener('resize', this.onResize.bind(this));
        // window.addEventListener('orientationchange', this.onResize.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    getFPS() {
        return Math.floor(this.fps);
    }

    setFPS(fps) {
        this.fps = fps;
        this.frameRate = 1000 / this.fps;
    }

    update() {
        setTimeout(this.update, this.fps);
    }

    getWidth() {
        return document.documentElement.clientWidth || window.innerWidth;
    }

    getHeight() {
        return document.documentElement.clientHeight || window.innerHeight;
    }

    getScroll() {
        return {
            top:  document.documentElement.scrollTop || document.body.scrollTop,
            left: document.documentElement.scrollLeft || document.body.scrollLeft
        };
    }

    // onResize() {
    //     this.setSize();
    //     getDOM('.wrapper')[0].setAttribute('style', `min-height: ${getHeight(window)}px;`);
    //
    //     // スマホが横向きだったら
    //     if (Math.abs(window.orientation) === 90) {
    //
    //         getDOM('.mode01-mask-scene')[0].setAttribute('style', `min-height: ${getHeight(window) + COMPLETE_BUTTON + UI_BUTTONS + AU_HEADER}px;`);
    //         getDOM('.mode01-set-scene')[0].setAttribute('style', `min-height: ${getHeight(window) + COMPLETE_BUTTON + UI_BUTTONS + AU_HEADER}px;`);
    //         getDOM('.mode02-set-scene')[0].setAttribute('style', `min-height: ${getHeight(window) + COMPLETE_BUTTON + UI_BUTTONS + AU_HEADER}px;`);
    //
    //         // ツールで一寸ツールだったら
    //         if (hasClass(getDOM('.mode02-set-scene .ui-buttons .chara')[0], 'is-active')) {
    //             GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (STEP_HEADER + ISSUN_SLIDER));
    //
    //         // ツールで手のひらツールだったら
    //         } else if (hasClass(getDOM('.mode02-set-scene .ui-buttons .hand')[0], 'is-active')) {
    //             GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (STEP_HEADER + NORMAL_SLIDER));
    //         } else {
    //             this.setSize();
    //         }
    //
    //     // スマホが縦向きだったら
	// 	} else {
    //         getDOM('.mode01-mask-scene')[0].setAttribute('style', `min-height: 100%;`);
    //         getDOM('.mode01-set-scene')[0].setAttribute('style', `min-height: 100%;`);
    //         getDOM('.mode02-set-scene')[0].setAttribute('style', `min-height: 100%;`);
    //
    //         // ツールで一寸ツールだったら
    //         if (hasClass(getDOM('.mode02-set-scene .ui-buttons .chara')[0], 'is-active')) {
    //             this.issunSetSize();
    //
    //         // ツールで手のひらツールだったら
    //         } else if (hasClass(getDOM('.mode02-set-scene .ui-buttons .hand')[0], 'is-active')) {
    //             this.notToolSetSize();
    //         } else {
    //             this.setSize();
    //         }
	// 	}
    // }

    setSize() {
        removeClass(getDOM('.ui-sliders')[0], 'is-hide');
        removeClass(getDOM('.ui-sliders')[1], 'is-hide');
        removeClass(getDOM('.ui-sliders')[2], 'is-hide');

        // スマホが横向きだったら
        if (Math.abs(window.orientation) === 90) {
            GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (STEP_HEADER + NORMAL_SLIDER));
        } else {
            GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (AU_HEADER + STEP_HEADER + NORMAL_SLIDER + UI_BUTTONS + COMPLETE_BUTTON));
        }
    }

    issunSetSize() {
        removeClass(getDOM('.ui-sliders')[0], 'is-hide');
        removeClass(getDOM('.ui-sliders')[1], 'is-hide');
        removeClass(getDOM('.ui-sliders')[2], 'is-hide');

        // スマホが横向きだったら
        if (Math.abs(window.orientation) === 90) {
            // ツールで一寸ツールだったら
            if (hasClass(getDOM('.mode02-set-scene .ui-buttons .chara')[0], 'is-active')) {
                GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (STEP_HEADER + ISSUN_SLIDER));

            // ツールで手のひらツールだったら
            } else if (hasClass(getDOM('.mode02-set-scene .ui-buttons .hand')[0], 'is-active')) {
                GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (STEP_HEADER + NORMAL_SLIDER));
            }
        } else {
            GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (AU_HEADER + STEP_HEADER + ISSUN_SLIDER + UI_BUTTONS + COMPLETE_BUTTON));
        }
    }

    notToolSetSize() {
        addClass(getDOM('.ui-sliders')[0], 'is-hide');
        addClass(getDOM('.ui-sliders')[1], 'is-hide');
        addClass(getDOM('.ui-sliders')[2], 'is-hide');

        // スマホが横向きだったら
        if (Math.abs(window.orientation) === 90) {
            GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (STEP_HEADER));
        } else {
            GNS.Editor.getInstance().setSize(AU_HEADER + STEP_HEADER, getHeight(window) - (AU_HEADER + STEP_HEADER + UI_BUTTONS + COMPLETE_BUTTON));
        }
    }

    editorShow() {
        GNS.Editor.getInstance().show();
        addClass(getDOM('#editor'), 'is-show');
    }

    editorHide() {
        GNS.Editor.getInstance().hide();
        removeClass(getDOM('#editor'), 'is-show');
    }

    onScroll() {
    }
}

module.exports = BaseApp;
