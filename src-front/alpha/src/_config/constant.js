
"use strict"

const BASE_DIR = '';
const BASE_URL = 'https://trnspt.com/';
const BASE_TITLE = 'Transparent';
const BASE_DESCRIPTION = "Transparent, the first audio recognition tool that serves a stream of content that follows your verbal conversation.";
const BASE_KEYWORD = 'Transparent';


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
        tweet: ` ${BASE_URL} #transparent`,
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
        image: `https://res.cloudinary.com/negic/image/upload/v1520401274/og.png`,
        locale: 'ja_JP',
        type: 'website'
    }

};
