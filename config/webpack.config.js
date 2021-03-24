const path = require('path');
const paths = require('./paths');

const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'
const PAGES_DIR = path.resolve(paths.source, 'pug', 'pages')
const PAGES_DIR_POPUP = path.resolve(paths.source, 'pug', 'pages', 'popup')
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))
const PAGES_POPUP = fs.readdirSync(PAGES_DIR_POPUP).filter(fileName => fileName.endsWith('.pug'))

module.exports = {

  entry: {
    main: path.resolve(paths.source, './js/index.js')
  },

  output: {
    path: paths.output,
    filename: 'assets/js/[name].js',
    // publicPath: '/templates/',
    clean: true,
  },

  optimization: {
    splitChunks: {
      name: 'vendors',
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.pug$/,
        use: ['raw-loader', 'pug-plain-loader?pretty=true']
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
          use: isDev ? ['style-loader', 'css-loader?url=false', 'postcss-loader', 'sass-loader'] : [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader' ,]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline',
      }
    ]
  },

  plugins: [

    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: path.resolve(PAGES_DIR, page),
      filename: `./${page.replace(/\.pug/,'.html')}`,
      minify: false,
      collapseWhitespace: true,
      inject: 'body'
    })),

    ...PAGES_POPUP.map((page) => new HtmlWebpackPlugin({
      template: path.resolve(PAGES_DIR_POPUP, page),
      filename: `./assets/popup/${page.replace(/\.pug/,'.html')}`,
      minify: false,
      collapseWhitespace: true,
      inject: false
    })),

    new BeautifyHtmlWebpackPlugin({
      "indent_size": 2,
      "indent_with_tabs": false,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.source, 'assets'),
          to: path.resolve(paths.output, 'assets')
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: '[id].css'
    })
  ]
};