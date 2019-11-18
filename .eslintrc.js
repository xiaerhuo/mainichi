module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Component: "writable"

  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    eqeqeq: "off"
  }
}
