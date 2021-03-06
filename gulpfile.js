var autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    svgmin = require('gulp-svgmin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence');


// -----------------------------------------------------------------------------
// start local server ----------------------------------------------------------
// -----------------------------------------------------------------------------
gulp.task('browser-sync', function() {
    browserSync.init(['**/*.css', 'js/*.js', '**/*.html'], {
      // This port should be different from the express app port
      server: 'docs',
      port: 51723,
      browser: ['opera'],
  });
});


// -----------------------------------------------------------------------------
// optimize svg ----------------------------------------------------------------
// -----------------------------------------------------------------------------
gulp.task('svg-optimize', function () {
  return gulp.src(['svg/*.svg'])
  .pipe(svgmin())
  .pipe(gulp.dest('svg'));
});


// -----------------------------------------------------------------------------
// sass compailer --------------------------------------------------------------
// -----------------------------------------------------------------------------
gulp.task('css-compile', function() {
    gulp.src([
      'scss/dark/noti-dark.scss',
      'scss/light/noti-light.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});


// -----------------------------------------------------------------------------
// auto prefix css for better browser support ----------------------------------
// -----------------------------------------------------------------------------
gulp.task('css-autoprefix', function () {
  gulp.src([
    'css/noti-dark.css',
    'css/noti-light.css'
  ])
  .pipe(sourcemaps.init())
  .pipe(postcss([
    autoprefixer({
      browsers: ['last 10 versions']
    })
  ]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css'));
});



// -----------------------------------------------------------------------------
// minify css ------------------------------------------------------------------
// -----------------------------------------------------------------------------
gulp.task('css-minify', function() {
  gulp.src([
      'css/noti-dark.css',
      'css/noti-light.css'
    ])
    .pipe(plumber())
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});


// -----------------------------------------------------------------------------
// minify js --------------------------------------------------------
// -----------------------------------------------------------------------------
gulp.task('js-minify', function() {
  gulp.src([
      'js/noti.js'
    ])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});


// -----------------------------------------------------------------------------
// watching sass files  --------------------------------------------------------
// -----------------------------------------------------------------------------
gulp.task('scss-watch', ['css-compile'], function() {
  gulp.watch('scss/**/*.scss', ['css-compile']);
});


// ----------------------------------------------------------------------------
// default gulp task  ---------------------------------------------------------
// ----------------------------------------------------------------------------
gulp.task('default', function() {
  runSequence('browser-sync','scss-watch');
});
