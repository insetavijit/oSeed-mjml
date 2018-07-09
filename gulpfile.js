var
    gulp = require('gulp'),
    fs = require('fs'),
    glob = require("glob"),
    pkg = require('./package.json'),
    vl = require('./vl.json'), //vendor list
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    log = require('fancy-log'),
    //util
    del = require('del'),
    ren = require('gulp-rename'),
    imgMin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    plumber = require('gulp-plumber'),
    pump = require('pump'),
    _if = require('gulp-if')
    //pugs
    pug = require('gulp-pug'),
    html2jade = require('gulp-html2jade')
;

