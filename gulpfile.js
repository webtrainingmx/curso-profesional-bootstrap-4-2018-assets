const sass = require('gulp-sass');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('watch', () => {
  gulp.watch(['src/scss/**/*.scss'], ['sass:compiled']);
});

gulp.task('sass:compiled', () => {
  function buildStyles(prod) {
    return gulp.src('src/scss/main.scss').pipe(sourcemaps.init()).pipe(sass({
      outputStyle: prod ? 'compressed' : 'expanded',
    })).pipe(rename(filePath => {
          if (filePath.basename === 'main') {
            filePath.basename = 'all-styles';
          }
          if (prod) {
            filePath.extname = `.min${filePath.extname}`;
          }
        }),
    ).pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '../src',
    })).pipe(gulp.dest('dist/css'));
  }

  buildStyles();
  buildStyles(true);
});