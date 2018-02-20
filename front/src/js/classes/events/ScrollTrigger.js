
// ## options::
// : elm
// : visibleScrollDown()
// : visibleScrollUp()
// : inTheElm()
// : isVisible()

class ScrollTrigger {

    constructor(options) {
        this.opt = options;
        this.oneFlg = true;

        window.addEventListener('scroll', this.onScroll.bind(this), false);
        window.addEventListener('load',   this.onScroll.bind(this), false);
    }

    onScroll(e) {
        var eT = this.opt.el.offsetTop; // 要素の位置
        var eH = this.opt.el.clientHeight; //要素の高さ
        var sT = document.documentElement.scrollTop || document.body.scrollTop; // スクロール量
        var wH = document.documentElement.clientHeight || window.innerHeight; // 表示領域の高さ

        // 上から 要素が表示したとき
        if (sT > eT - wH + this.opt.extra && sT < eT + eH + this.opt.extra && this.oneFlg) {
            this.oneFlg = false;
            if (this.opt.visibleScrollDown) {
                this.opt.visibleScrollDown(this.opt);
            }
        }

        // window下部から要素が見えなくなった時
        if (sT < eT - wH && sT < eT) {
            if (this.opt.visibleScrollUp) {
                this.opt.visibleScrollUp(this.opt);
            }
        }

        // 要素が上部に触れている間
        if (sT > eT && eT + eH > sT) {
            if (this.opt.inTheElm) {
                this.opt.inTheElm(this.opt);
            }
        }

        // 要素がwindow内に表示されている間
        if (eT + eH > sT && sT < eT + eH && sT > eT - wH) {
            if (this.opt.isVisible) {
                this.opt.isVisible(this.opt);
            }
        } else {
            if (this.opt.isVisibleNone) {
                this.opt.isVisibleNone(this.opt);
            }
        }

    }
}

module.exports = ScrollTrigger;
