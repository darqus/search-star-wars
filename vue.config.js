const { defineConfig } = require('@vue/cli-service')
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === 'production' ? '/search-star-wars/dist/' : '/',
  outputDir: 'dist',
  transpileDependencies: ['vuetify'],
  // transpileDependencies: true,
  lintOnSave: true,
})
