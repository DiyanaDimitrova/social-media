'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let openURL = require('open')
let lazypipe = require('lazypipe')
let rimraf = require('rimraf')
let wiredep = require('wiredep').stream
let runSequence = require('run-sequence')

let socialMedia = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
}

let paths = {
  scripts: [socialMedia.app + '/scripts/**/*.js'],
  styles: [socialMedia.app + '/styles/**/*.scss'],
  views: {
    main: socialMedia.app + '/index.html',
    files: [socialMedia.app + '/views/**/*.html']
  }
}

////////////////////////
// Reusable pipelines //
////////////////////////

let styles = lazypipe()
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles')

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles())
})

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb)
})

gulp.task('start:client', ['start:client-server', 'styles'], function () {
  openURL('http://localhost:9000')
})

gulp.task('start:client-server', function () {
  $.connect.server({
    root: [socialMedia.app, '.tmp'],
    livereload: true,
    port: 9000
  })
})

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload())

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload())

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe($.connect.reload())
  gulp.watch('bower.json', ['bower'])
})

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['start:client'],
    'watch', cb)
})

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: socialMedia.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest(socialMedia.app + '/views'))
})

gulp.task('images', function () {
  return gulp.src(socialMedia.app + '/images/**/*')
         .pipe(gulp.dest(socialMedia.app + '/../.tmp/images'))
})

gulp.task('default', ['serve'])
