var path          = require('path');
var fs            = require('fs');
var gulp          = require('gulp');
var del           = require('del');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');
var watch         = require('gulp-watch');

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
	watch(src.js,function(){
		gulp.start("js");
	});
	watch(src.json,function(){
		gulp.start("json");
	});
	watch(src.view,function(){
		gulp.start("view");
	});
	watch(src.style,function(){
		gulp.start("style");
	});
	watch(src.images,function(){
		gulp.start("images");
	});
	watch('src',function(e){
		if (e.event == 'unlink'){
			// console.dir(e);
			let filePath = e.history[0].replace('.scss','.wxss');
			del([filePath.substr(path.resolve('').length+1).replace('src','dist')]);
		}
	})
})
gulp.task('default',['clean'],function(){
	setTimeout(function(){
		gulp.start('js','images','view','style','json','watch');
	},800);
});

// 创建文件命令
// gulp init --url src/pages/user
gulp.task('init',function(){
	let url = gulp.env.url,
		fileArr = ['wxml','js','json','scss'],
		fileContent = ['','Page({})','[]',''];
	if (url){
		let index = url.lastIndexOf("/");
		let fileName = url.substr(index+1);
		let pathUrl = path.resolve('src/'+url);
		if (!fs.existsSync(pathUrl)){
			fs.mkdirSync(pathUrl);
		}
		for (let i in fileArr){
			fs.writeFileSync(`${pathUrl}/${fileName}.${fileArr[i]}`,fileContent[i]);
		}
		fs.readFile('src/app.json',function(err,data){
			if (err) throw err;
			let jsonObj = JSON.parse(data);
			if (jsonObj.pages.indexOf(url+'/'+fileName) == -1){
				jsonObj.pages.push(url+'/'+fileName);
				fs.writeFile('src/app.json',JSON.stringify(jsonObj,null,4));
			}
		})
	}
})