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
const testDir = path.resolve(__dirname, '../test/dist')
// 压缩JS
const jsMinify = (destDir) =>
  function uglifyJs () {
    return gulp
      .src(`${srcDir}/**/*.js`)
      .pipe(uglify())
      .pipe(gulp.dest(destDir))
  }

// 解析less
const lessCompiler = (destDir) =>
  function compileLess () {
    return gulp
      .src(`${srcDir}/**/*.less`)
      .pipe(less())
      .pipe(insert.transform((contents, file) => {
        if (!file.path.includes(`components${path.sep}common`)) {
          contents = `@import '../common/index.wxss';${contents}`
        }
        return contents
      }))
      .pipe(rename({
        extname: '.wxss'
      }))
      .pipe(gulp.dest(destDir))
  }

// 不需要特殊处理的文件直接复制
const elseCopier = (destDir) =>
  gulp.parallel(
    copier(destDir, 'wxml'),
    copier(destDir, 'json'),
    copier(destDir, 'wxs'),
    copier(destDir, 'wxss')
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
    jsMinify(distDir),
    lessCompiler(distDir),
    elseCopier(distDir)
  )
)

tasks.buildTest = gulp.series(
  cleaner(testDir),
  gulp.parallel(
    jsMinify(testDir),
    lessCompiler(testDir),
    elseCopier(testDir),
    () => {
      gulp.watch(`${srcDir}/**/*.js`, jsMinify(testDir))
      gulp.watch(`${srcDir}/**/*.less`, lessCompiler(testDir))
      gulp.watch(`${srcDir}/**/*.json`, copier(testDir, 'json'))
      gulp.watch(`${srcDir}/**/*.wxs`, copier(testDir, 'wxs'))
      gulp.watch(`${srcDir}/**/*.wxml`, copier(testDir, 'wxml'))
    }
  )
)
module.exports = tasks
