var path          = require('path');
var gulp          = require('gulp');
var del           = require('del');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');

var src  = {
	images: 'src/**/*.{png,jpg,jpeg,svg,gif}',
	js: 'src/**/*.js',
	style: 'src/**/!(common).{scss,css,sass,wxss}',
	json: 'src/**/*.json',
	view: 'src/**/*.{html,wxml}'
};
const dist = 'dist/';
gulp.task('clean',function() {
	del([
		'dist/**/*'
	]);
});

gulp.task('view', function () {
	return gulp.src(src.view)
		.pipe(rename({
			extname: ".wxml"
		}))
		.pipe(gulp.dest(dist));
});
gulp.task('json', function () {
	return gulp.src(src.json)
		.pipe(gulp.dest(dist))
});
gulp.task('images', function () {
	return gulp.src(src.images)
		.pipe(gulp.dest(dist))
});

gulp.task('js', function () {
	return gulp.src(src.js)
		.pipe(gulp.dest(dist))
});
gulp.task('style',function(){
	return gulp.src(src.style)
	.pipe(sass().on('error', sass.logError))
	.pipe(rename({
		extname: ".wxss"
	}))
	.pipe(gulp.dest(dist));
})
gulp.task('watch',function(){
	gulp.watch(src.js,["js"]);
	gulp.watch(src.json,["json"]);
	gulp.watch(src.view,["view"]);
	gulp.watch(src.style,["style"]);
	gulp.watch(src.images,["images"]);
})
gulp.task('default',['clean'],function(){
	setTimeout(function(){
		gulp.start('js','images','view','style','json','watch');
	},800);
});