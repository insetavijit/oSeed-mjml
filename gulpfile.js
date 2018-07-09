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
    mjml = require("gulp-mjml"),
    mjmlEngine = require("mjml")
;

/**
 * @type Move img src files
 * @desc : pipe
 * @version 1.0
 */
gulp.task('sft:img', gulp.parallel((done) => {
    pump([
        gulp.src(vl.img.src),
        imgMin(),
        gulp.dest(vl.img.dist)
    ], done());
}));
/**
 * @type cleaning 
 * @desc none 
 * @version 1.0.0
 */
gulp.task('clr:bin', gulp.parallel((done) => {
    del(vl.common.bin + '/*');
    done();
}));
gulp.task('clr:dist', gulp.parallel((done) => {
    del(vl.common.dist + '/*');
    done();
}));

/**
 * @type Live Reload
 * @desc : browser-sync | none 
 * @version 1.0
 */
gulp.task('show', gulp.parallel((done) => {
    browserSync.init({
        server: vl.common.dist
    });
    done();
}));


/**
 * @type compile pug -> mjml ->html
 */

gulp.task('pug:full', gulp.parallel((done) => {
    pump([
        gulp.src(vl.pug.entryfile),
        plumber(),
        pug({
            pretty: true
        }),
        mjml(mjmlEngine, {
            minify: false
        }),
        gulp.dest(vl.pug.dist)
    ], done());
}))
gulp.task('pug:min', gulp.parallel((done) => {
    pump([
        gulp.src(vl.pug.entryfile),
        plumber(),
        pug({
            pretty: false
        }),
        mjml(mjmlEngine, { minify: true}),
        gulp.dest(vl.pug.dist)
    ], done());
}));

/**
 * @name watchs
 * @author avijit sakrar
 * @version 1.0
 * 
 */
gulp.task('pug:w', gulp.parallel('pug:min', (done) => {
    gulp.watch(vl.watch.pug, gulp.parallel('pug:min'))
    done();
}))
gulp.task('show:w', gulp.parallel('show', () => {
    gulp.watch(vl.common.dist).on('change', reload)
}));

/**
 * @name ShortHand (:all)
 * @author avijit sakrar
 * @version 1.0
 * 
 */
gulp.task('clr:all', gulp.parallel('clr:bin', 'clr:dist'));

/**
 * @name ShortHand ( you will use it )
 * @author avijit sakrar
 * @version 1.0
 * 
 */
gulp.task('dev:all', gulp.parallel('pug:w', 'show:w'))
gulp.task('dev:font', gulp.parallel('pug:w'))

gulp.task('clear', gulp.parallel('clr:all'));

gulp.task('build', gulp.series('clear', 'sft:img', 'pug:min'));