const path = require('path');
const paths = require('./paths');
const webpackConfiguration = require('./webpack.config');

const { merge } = require('webpack-merge');

module.exports = merge(webpackConfiguration, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  // target: ['web', 'es5'],
  devServer: {
    publicPath: '/',
    contentBase: paths.output,
    // openPage: './index.html',
    open: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: []
  },

  plugins: [
  ],  
})