const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

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
    pintclone: [
      path.resolve(__dirname, 'templates/pintclone.pug')
    ],
    multilingual: [
      path.resolve(__dirname, 'templates/multilingual.pug')
    ],
    bookTrader: [
      path.resolve(__dirname, 'templates/bookTrader.pug')
    ],
    compareStocks: [
      path.resolve(__dirname, 'templates/compareStocks.pug')
    ],
    barsvp: [
      path.resolve(__dirname, 'templates/barsvp.pug')
    ],
    quickPoll: [
      path.resolve(__dirname, 'templates/quickPoll.pug')
    ],
    boilerplate: [
      path.resolve(__dirname, 'templates/boilerplate.pug')
    ],
    d3: [
      path.resolve(__dirname, 'templates/d3.pug')
    ],
    react: [
      path.resolve(__dirname, 'templates/react.pug')
    ],
    frontend: [
      path.resolve(__dirname, 'templates/frontend.pug')
    ]
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

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets()
  );
}
