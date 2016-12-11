const gulp = require('gulp')
const del = require('del')
const uglify = require('gulp-uglify')
const zip = require('gulp-zip')

gulp.task('clean', done => del('chrome/dist', done))

gulp.task('copy.lib', ['clean'], () => gulp
  .src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/toastr/build/toastr.min.{css,js}',
  ])
  .pipe(gulp.dest('chrome/dist'))
)

gulp.task('copy.license', () => gulp
  .src('LICENSE')
  .pipe(gulp.dest('chrome'))
)

gulp.task('copy.dev', () => gulp
  .src('contentscript.js')
  .pipe(gulp.dest('chrome/dist'))
)

gulp.task('build', () => gulp
  .src('contentscript.js')
  .pipe(uglify())
  .pipe(gulp.dest('chrome/dist'))
)

gulp.task('default', ['copy.lib'], () => gulp
  .watch('contentscript.js', ['copy.dev'])
)

gulp.task('release', ['copy.lib', 'copy.license'], () => gulp
  .src('chrome')
  .pipe(zip('extension.zip'))
  .pipe(gulp.dest(''))
)