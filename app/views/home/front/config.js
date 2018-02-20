
"use strict"

const constant = require('./src/_config/constant')
const data = require('./src/_config/data')


module.exports = {

    // ftp:
    //     host: 'maskman-inc.sakura.ne.jp'
    //     user: 'ftp@maskman-inc.sakura.ne.jp'
    //     pass: 'zrrZg0eGjda8maHo'
    //     remotePath: '/'

    develop: {
        data: data,
        constant: constant,
        debug: true,

        path: {
            root:  './src',
            jade:  './src/jade',
            sass:  './src/sass',
            js:    './src/js'
        }
    },

    dest: {
        path: {
            root: './dest',
            css:  './dest/assets/css',
            js:   './dest/assets/js',
            img:  './dest/assets/img'
        }
    },

    production: {
        data: data,
        constant: constant,
        debug: false,

        path: {
            root: './production',
            css:  './production/assets/css',
            js:   './production/assets/js',
            img:  './production/assets/img'
        }
    }
};
