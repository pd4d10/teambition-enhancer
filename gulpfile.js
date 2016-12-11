const gulp = require('gulp')
const del = require('del')
const uglify = require('gulp-uglify')
const zip = require('gulp-zip')
const runSequence = require('run-sequence')

gulp.task('clean', done => del('chrome/dist', done))

gulp.task('copy.lib', () => gulp
  .src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/toastr/build/toastr.min.{css,js}',
    'node_modules/clipboard/dist/clipboard.min.js'
  ])
  .pipe(gulp.dest('chrome/dist'))
)

gulp.task('copy.license', () => gulp
  .src('LICENSE')
  .pipe(gulp.dest('chrome'))
)

gulp.task('dev', () => gulp
  .src('contentscript.js')
  .pipe(gulp.dest('chrome/dist'))
)

gulp.task('build', () => gulp
  .src('contentscript.js')
  .pipe(uglify({
    compress: {
      drop_console: true,
    }
  }))
  .pipe(gulp.dest('chrome/dist'))
)

gulp.task('default', ['copy.lib', 'dev'], () => gulp
  .watch('contentscript.js', ['dev'])
)

gulp.task('zip', () => gulp
  .src('chrome')
  .pipe(zip('extension.zip'))
  .pipe(gulp.dest(''))
)

gulp.task('release', () => runSequence(
  'clean',
  ['copy.lib', 'copy.license', 'build'],
  'zip'
))
