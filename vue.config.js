process.env.VUE_APP_VERSION = require('./package.json').version

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '',
  outputDir: '../ssw_dist',
  transpileDependencies: ['vuetify'],
  // transpileDependencies: true,
  lintOnSave: false,
})
