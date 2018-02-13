
"use strict"

const BASE_DIR = '';
const BASE_URL = '';
const BASE_TITLE = '';
const BASE_DESCRIPTION = "";
const BASE_KEYWORD = '';


module.exports = {

    BASE_URL: BASE_URL,
    BASE_TITLE: BASE_TITLE,
    BASE_DESCRIPTION: BASE_DESCRIPTION,
    BASE_KEYWORD: BASE_KEYWORD,

    CHARSET: 'utf-8',
    LANG: 'ja',

    ANALYTICS: {
        id: '',
        domain: BASE_URL
    },

    TWITTER: {
        tweet: ` ${BASE_URL} #hoge`,
        lang: 'ja'
    },

    FB: {
        lang: 'ja_JP',
        app_id: 1
    },

    OG: {
        url: BASE_URL,
        title: BASE_TITLE,
        site_name: BASE_TITLE,
        description: BASE_DESCRIPTION,
        image: `${BASE_URL}/assets/img/config/og.jpg`,
        locale: 'ja_JP',
        type: 'website'
    }

};
