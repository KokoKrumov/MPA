var config = {
    buildFilesFoldersRemove:[
        'build/scss/',
        'build/js/!(*.min.js)',
        'build/bower.json',
        'build/bower_components/',
        'build/maps/'
    ]
};


//Required
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    sass = require('gulp-sass');


//Script Task
gulp.task('scripts', function () {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(reload({stream:true}));
});

//Sass Task
gulp.task('sass', function () {
    gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers:['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream:true}));
});

//HTML Task
gulp.task('html',function () {
    gulp.src('app/**/*.html')
        .pipe(reload({stream:true}));
});



// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function () {
    del([
        'build/**'
    ]);
});

// task to create build directory of all files
gulp.task('build:copy', ['build:cleanfolder'], function(){
    return gulp.src('app/**/*/')
        .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy'], function (cb) {
    del(config.buildFilesFoldersRemove, cb);
});

gulp.task('build', [ 'build:copy', 'build:remove']);





//Browser Task
gulp.task('browser-sync', function () {
    browserSync({
        server:{
            baseDir:"./"
        },
        startPath: "/app"
    })
});

//task to run build server for testing final app
gulp.task('build:serve', function () {
    browserSync({
        server:{
            baseDir:"./build/"
        }
    })
});



//Watch Task
gulp.task('watch', function () {
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['html']);
});

//Default Task
gulp.task('default', ['scripts', 'sass', 'browser-sync', 'watch']);