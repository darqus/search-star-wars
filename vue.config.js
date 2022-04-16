const { defineConfig } = require('@vue/cli-service')
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = defineConfig({
  publicPath: '',
  outputDir: '../ssw_dist',
  transpileDependencies: ['vuetify'],
  // transpileDependencies: true,
  lintOnSave: true,
})
