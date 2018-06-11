
var _ = require('lodash')
var BaseApp = require('../utils/BaseApp')
var data = require('../../../_config/data')


const COMMENT_BOX_SIZE = 500 / 1.5;
const RANGE = 200; // .commentボックスのズレ具合
const TRY_COUNT = 999; // 配置が重なっていた時に再度ランダムをやり直す回数

class Transcripts extends BaseApp {

    constructor() {
        super();

        this.masonry();
    }

}

module.exports = Transcripts;
