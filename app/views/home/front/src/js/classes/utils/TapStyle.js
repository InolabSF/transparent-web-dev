
var {addClass, removeClass} = require('./BaseUtils').utils


class TapStyle {

    constructor(opt) {
        this.className = (opt.className) ? this.className : 'tap-style';

        opt.el.addEventListener('touchstart', this.eventHandler.bind(this), false);
        opt.el.addEventListener('touchend',   this.eventHandler.bind(this), false);
    }

    eventHandler(event) {
        var el = event.currentTarget;

        if (event.type === 'touchstart') {
            addClass(el, this.className);

        } else if (event.type === 'touchend'){
            removeClass(el, this.className);
        }
    }
}

module.exports = TapStyle;
