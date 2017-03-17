const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.js')

module.exports = function (env) {
  const config = {
    devServer: {
      historyApiFallback: true
    },

    plugins: [
      new webpack.NamedModulesPlugin()
    ],
  }

  return webpackMerge(baseConfig(env), config)
}