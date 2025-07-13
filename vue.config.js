const { defineConfig } = require('@vue/cli-service')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === 'production' ? '/search-star-wars-v2/' : '/',
  outputDir: 'dist',
  // Use relative paths in index.html for GitHub Pages
  indexPath: 'index.html',
  // Clean existing dist before building
  chainWebpack: (config) => {
    config.plugin('clean').use(CleanWebpackPlugin)
  },
  transpileDependencies: ['vuetify', 'clean-webpack-plugin'],
  // transpileDependencies: true,
  lintOnSave: true,
  configureWebpack: {
    performance: {
      // Disable asset size limit warnings
      hints: false,
    },
  },
})
