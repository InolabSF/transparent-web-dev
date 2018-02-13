var velocity = require('velocity-animate')

class Anchor {
    constructor(opt) {
        this.speed  = (opt.speed)  ? opt.speed  : 500;
        this.extra  = (opt.extra)  ? opt.extra  : 0;
        this.easing = (opt.easing) ? opt.easing : 'ease';
        this.el = opt.el;
        this.el.addEventListener('click', this.eventHandler.bind(this), false);
    }

    eventHandler(event) {
        var idName, to;
        event.preventDefault();
        idName = this.el.getAttribute('href').replace(/#/, '');
        to = document.getElementById(idName);
        velocity(to, "scroll", {
            duration: this.speed,
            easing: this.easing
        });
    }

}

module.exports = Anchor
