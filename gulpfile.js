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
    html2jade = require('gulp-html2jade'),
    //mjml
    mjml = require("gulp-mjml")
;

/**
 * @type Move img src files
 * @desc : pipe
 * @version 1.0
 */
gulp.task('sft:img', gulp.parallel((done) => {
    pump([
        gulp.src(vl.src.img),
        imgMin(),
        gulp.dest(vl.dist.img)
    ], done());
}));
/**
 * @type cleaning 
 * @desc none 
 * @version 1.0.0
 */
gulp.task('clr:bin', gulp.parallel((done) => {
    del(vl.cmommon.bin + '/*');
    done();
}));
gulp.task('clr:dist', gulp.parallel((done) => {
    del(vl.cmommon.dist + '/*');
    done();
}));

/**
 * @type Live Reload
 * @desc : browser-sync | none 
 * @version 1.0
 */
gulp.task('show', gulp.parallel((done) => {
    browserSync.init({
        server: dirs.dist
    });
    done();
}));


/**
 * @type compile pug -> html
 */

gulp.task('pug:min', gulp.parallel((done) => {
    pump([
        gulp.src(vl.pug.entryfile),
        plumber(),
        pug({
            pretty: true
        }),
        // mjml(),
        gulp.dest(vl.pug.dist)
    ], done());
}))
gulp.task('pug:full', gulp.parallel((done) => {
    pump([
        gulp.src(vl.pug.entryfile),
        plumber(),
        pug({
            pretty: true
        }),
        mjml(),
        gulp.dest(vl.pug.dist)
    ], done());
}));