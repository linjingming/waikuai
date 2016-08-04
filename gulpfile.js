//包含gulp
var gulp = require('gulp');
//包含我们的插件
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var dir = {
    source: 'assets/',
    release: 'dist/'
}
//编译sass
gulp.task('styles', function () {
    return sass(dir.source + 'css/*.scss',{style: 'expanded'})
        .pipe(plumber())
        .pipe(gulp.dest(dir.source + 'css'))
        .pipe(browserSync.stream());
});
//编译JS
gulp.task('script',function(){
    gulp.src(dir.source + 'js/*.js')
        .pipe(gulp.dest(dir.release + 'js'));
});
//编译html
gulp.task('html', function () {
    gulp.src(dir.source + '*.html')
        .pipe(gulp.dest(dir.release))
        .pipe(browserSync.stream());
});
//编译image
gulp.task('image', function () {
    gulp.src(dir.source + 'images/*')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(dir.release + 'images'))
        .pipe(browserSync.stream());
});
//实时监听
gulp.task('watch',function(){
    browserSync.init({
        server: "./" + dir.source
    });
    gulp.watch(dir.source + 'css/*.scss',['styles']);
    gulp.watch(dir.source + '*.html').on('change', browserSync.reload);
});
//编译
gulp.task('dist',['html','script','image'], function () {
    return sass(dir.source + 'css/common.scss',{style: 'compressed'})
        .pipe(plumber())
        .pipe(gulp.dest(dir.release + 'css'))
});
//默认任务
gulp.task('default',['styles','watch']);