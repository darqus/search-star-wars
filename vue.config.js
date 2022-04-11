process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  publicPath: '',
  outputDir: '../ssw_dist',
  devServer: {
    disableHostCheck: true,
  },
  transpileDependencies: ['vuetify'],
}
