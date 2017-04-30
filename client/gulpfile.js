// Generated on 2017-04-28 using generator-angular 0.16.0
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
  test: ['test/spec/**/*.js'],
  testRequire: [
    socialMedia.app + '/bower_components/angular/angular.js',
    socialMedia.app + '/bower_components/angular-mocks/angular-mocks.js',
    socialMedia.app + '/bower_components/angular-resource/angular-resource.js',
    socialMedia.app + '/bower_components/angular-cookies/angular-cookies.js',
    socialMedia.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    socialMedia.app + '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: socialMedia.app + '/index.html',
    files: [socialMedia.app + '/views/**/*.html']
  }
}

////////////////////////
// Reusable pipelines //
////////////////////////

let lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish')

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

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts())
})

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb)
})

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000')
})

gulp.task('start:server', function() {
  $.connect.server({
    root: [socialMedia.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  })
})

gulp.task('start:server:test', function() {
  $.connect.server({
    root: ['test', socialMedia.app, '.tmp'],
    livereload: true,
    port: 9001
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
    .pipe(lintScripts())
    .pipe($.connect.reload())

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts())

  gulp.watch('bower.json', ['bower'])
})

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    'watch', cb)
})

// gulp.task('serve:prod', function() {
//   $.connect.server({
//     root: [socialMedia.dist],
//     livereload: true,
//     port: 9000
//   })
// })
//
// gulp.task('test', ['start:server:test'], function () {
//   let testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
//   return gulp.src(testToFiles)
//     .pipe($.karma({
//       configFile: paths.karma,
//       action: 'watch'
//     }))
// })

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: socialMedia.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest(socialMedia.app + '/views'))
})

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./dist', cb)
})

gulp.task('client:build', ['html', 'styles'], function () {
  let jsFilter = $.filter('**/*.js')
  let cssFilter = $.filter('**/*.css')

  return gulp.src(paths.views.main)
    .pipe($.useref({searchPath: [socialMedia.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest(socialMedia.dist))
})

gulp.task('html', function () {
  return gulp.src(socialMedia.app + '/views/**/*')
    .pipe(gulp.dest(socialMedia.dist + '/views'))
})

gulp.task('images', function () {
  return gulp.src(socialMedia.app + '/images/**/*')
         .pipe(gulp.dest(socialMedia.app + '/../.tmp/images'))
})

gulp.task('copy:extras', function () {
  return gulp.src(socialMedia.app + '/*/.*', { dot: true })
    .pipe(gulp.dest(socialMedia.dist))
})

gulp.task('copy:fonts', function () {
  return gulp.src(socialMedia.app + '/fonts/**/*')
    .pipe(gulp.dest(socialMedia.dist + '/fonts'))
})

gulp.task('build', ['clean:dist'], function () {
  runSequence(['images', 'copy:extras', 'copy:fonts', 'client:build'])
})

gulp.task('default', ['build'])
