

class FullBack {
    constructor(option) {
        this.parent = option.parent;
        this.el     = option.el;
        this.scale  = (option.scale) ? option.scale : 1;
        this.turn   = (option.turn) ? -1 : 1;
        this.style  = this.el.style;

        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize()
    }

    onResize(event) {
        var parentW, parentH;
        var elW = this.el.clientWidth  || this.el.innerWidth;
        var elH = this.el.clientHeight || this.el.innerHeight;

        if (this.parent == window) {
            parentW = document.documentElement.clientWidth  || window.innerWidth;
            parentH = document.documentElement.clientHeight || window.innerHeight;
        } else{
            parentW = this.parent.clientWidth || this.parent.innerWidth;
            parentH = this.parent.clientHeight || this.parent.innerHeight;
        }

        var scaleW = (parentW / elW) * this.scale;
        var scaleH = (parentH / elH) * this.scale;

        var fixScale = Math.max(scaleW, scaleH);

        var setW = elW * fixScale;
        var setH = elH * fixScale;

        var moveX = Math.floor((parentW - setW) / 2 * this.turn);
        var moveY = Math.floor((parentH - setH) / 2);

        this.style.width   = `${setW}px`;
        this.style.height  = `${setH}px`;
        this.style.left    = `${moveX}px`;
        this.style.top     = `${moveY}px`;
        this.style.opacity = 1;
    }
}

module.exports = FullBack
