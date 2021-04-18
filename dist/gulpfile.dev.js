"use strict";

var gulp = require('gulp'); // const sass = require('gulp-sass');


var htmlmin = require('gulp-htmlmin');

var browserSync = require('browser-sync');

var cleanCSS = require('gulp-clean-css');

var imagemin = require('gulp-imagemin');

console.log('imagemin', imagemin);

var jsmin = require('gulp-uglify');

var pipeline = require('readable-stream').pipeline;

var babel = require('gulp-babel');

gulp.task('es6-es5', function () {
  return pipeline(gulp.src('src/js/*.js').pipe(babel({
    presets: ["@babel/env"],
    plugins: []
  })), jsmin(), gulp.dest('./dist/js'));
});
gulp.task('buildHtml', function (done) {
  gulp.src('./src/index.html') // 压缩html
  .pipe(htmlmin({
    removeComments: true,
    //清除HTML注释
    collapseWhitespace: true,
    //压缩HTML
    collapseBooleanAttributes: true,
    //省略布尔属性的值 <input checked="true"/> ==> <input checked />
    removeEmptyAttributes: true,
    //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,
    //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,
    //删除<style>和<link>的type="text/css"
    minifyJS: true,
    //压缩页面JS
    minifyCSS: true //压缩页面CSS

  })).pipe(gulp.dest('./dist'));
  done();
});
gulp.task('allHtml', function (done) {
  gulp.src('./src/views/*.html') // 压缩html
  .pipe(htmlmin({
    removeComments: true,
    //清除HTML注释
    collapseWhitespace: true,
    //压缩HTML
    collapseBooleanAttributes: true,
    //省略布尔属性的值 <input checked="true"/> ==> <input checked />
    removeEmptyAttributes: true,
    //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,
    //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,
    //删除<style>和<link>的type="text/css"
    minifyJS: true,
    //压缩页面JS
    minifyCSS: true //压缩页面CSS

  })).pipe(gulp.dest('./dist/views'));
  done();
}); //压缩css

gulp.task('buildCss', function (done) {
  gulp.src('./src/css/dist/**/*.css').pipe(cleanCSS({
    advanced: false,
    //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
    compatibility: 'ie7',
    //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
    keepBreaks: true,
    //类型：Boolean 默认：false [是否保留换行]
    keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀

  })).pipe(gulp.dest('./dist/css/dist'));
  done();
}); //图片优化

gulp.task('imageyh', function (done) {
  gulp.src('./src/images/*').pipe(imagemin([imagemin.gifsicle({
    interlaced: true
  }), imagemin.mozjpeg({
    quality: 50,
    progressive: true
  }), imagemin.optipng({
    optimizationLevel: 5
  })])).pipe(gulp.dest('./dist/images'));
  done();
});
gulp.task('default', function () {
  // 启动服务器
  browserSync({
    // 设置服务器根目录
    server: './dist',
    // 代理其他服务器(既能实现自动刷新，也能保持其他服务器的特性)
    // proxy:'http://localhost:3000',
    port: 8080,
    // 监听文件修改，当监听的文件有修改时，自动刷新页面
    files: ['./dist/**/*.html', './dist/css/*.css', './dist/views/*.html']
  }, function () {
    console.log('服务器启动成功');
  }); //首页

  gulp.watch('./src/**/*.html', gulp.series('buildHtml')); //其他html

  gulp.watch('./src/views/*.html', gulp.series('allHtml')); //css

  gulp.watch('./src/css/dist/index.css', gulp.series('buildCss'));
  gulp.watch('./src/img/*', gulp.series('imageyh'));
  gulp.watch('./src/js/*.js', gulp.series('es6-es5'));
});