// ------------------------------- BALÍČKY -----------------------------
var gulp      = require('gulp');
    sass      = require('gulp-sass');
    concatCss = require('gulp-concat-css');
    concat    = require('gulp-concat');

// ------------------------------- CESTY -------------------------------
var paths = {
  sass: {
    src: 'src/scss/**/*.{scss,sass}',
    dest: 'assets/css',
    opts: {}
  },
  css: {
    src: 'assets/css/**/*.css',
    dest: '_dist/sys/css/',
    opts: {}
  },
  js: {
   src: 'src/js/**/*.js',
   dest: '_dist/sys/js/',
   opts: {} 
  }
};

// ------------------------------- ÚLOHY -------------------------------
// ---------- SASS ----------
gulp.task('sass', function () {
  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest))
});
// ---------- CSS ----------
gulp.task('concatCss', function() {
  return gulp.src(paths.css.src)
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest(paths.css.dest))
});
// ---------- JS ----------
gulp.task('jscripts', function() {
  return gulp.src(paths.js.src)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(paths.js.dest))
});

// ------------------------------- SEKVENCE ------------------------------
gulp.task('watch:styles', function () {
  gulp.watch(paths.sass.src, gulp.series('sass', 'concatCss'));
});

gulp.task('watch', gulp.series('sass',
  gulp.parallel('watch:styles')
));

// ---------- build SASS -> concat CSS -> concat JS ----------
// ------------------------- + watch -------------------------
gulp.task('default', gulp.series('sass', 'concatCss', 'jscripts',
  gulp.parallel('watch')
));