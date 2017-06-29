const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractStyles = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true,
})
let extractHtml = new ExtractTextPlugin('[name].html')

let config = {
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: {
    index: [
      path.resolve(__dirname, 'templates/index.pug'),
      path.resolve(__dirname, 'assets/styles/style.scss'),
      path.resolve(__dirname, 'assets/js/navigation.js')
    ],
    project: [
      path.resolve(__dirname, 'templates/project.pug')
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: extractHtml.extract({
          use: ['html-loader', 'pug-html-loader?pretty&exports=false']
        })
      },
      {
        test: /\.scss$/,
        use: extractStyles.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/*/,
        loader: 'babel-loader', // use this (babel-core) loader
        options: {
          presets: [
            ['es2015',
            { 'modules': false }]  // Stops babel from transforming ES6 modules into CommonJS modules, enableing tree-shaking of unsed code
          ]
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4']
          })
        ],
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, 'node_modules/sanitize.css/')
          ]
        },
      }
    }),
    extractStyles,
    extractHtml
  ]
}

module.exports = config;