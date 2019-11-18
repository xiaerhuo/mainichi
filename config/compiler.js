const gulp = require('gulp')
const path = require('path')
const util = require('util')
const uglify = require('gulp-uglify')
const less = require('gulp-less')
const rename = require('gulp-rename')
const insert = require('gulp-insert')
const exec = util.promisify(require('child_process').exec)
const distDir = path.resolve(__dirname, '../dist')
const srcDir = path.resolve(__dirname, '../src/components')

// 压缩JS
const jsMinify = () =>
  function uglifyJs () {
    return gulp
      .src(`${srcDir}/**/*.js`)
      .pipe(uglify())
      .pipe(gulp.dest(distDir))
  }

// 解析less
const lessCompiler = () =>
  function compileLess () {
    return gulp
      .src(`${srcDir}/**/*.less`)
      .pipe(less())
      .pipe(insert.transform((contents, file) => {
        if (!file.path.includes(`components${path.sep}common`)) {
          contents = `@import '../common/index.wxss;${contents}`
        }
        return contents
      }))
      .pipe(rename({
        extname: '.wxss'
      }))
      .pipe(gulp.dest(distDir))
  }

// 不需要特殊处理的文件直接复制
const elseCopier = () =>
  gulp.parallel(
    copier(distDir, 'wxml'),
    copier(distDir, 'json'),
    copier(distDir, 'wxs')
  )

const copier = (dist, ext) =>
  function copy () {
    return gulp
      .src(`${srcDir}/**/*.${ext}`)
      .pipe(gulp.dest(dist))
  }

const cleaner = path =>
  () => {
    return exec(`npx rimraf ${path}`)
  }
const tasks = {}
tasks.buildDist = gulp.series(
  cleaner(distDir),
  gulp.parallel(
    jsMinify(),
    lessCompiler(),
    elseCopier()
  )
)

module.exports = tasks
