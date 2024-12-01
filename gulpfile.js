var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const wait = require('gulp-wait');
const babel = require('gulp-babel');;
const rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('./js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(babel({
          presets: [['@babel/env', {modules:false}]]
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./js'));
});

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./js/scripts.js', gulp.series('scripts'));
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
});