'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: process.env.NODE_ENV.trim() === 'development'
});

module.exports = {
  devtool: 'source-map',
  entry: {
    browser: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'examples/App.js')
    ]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    definePlugin,
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("development")
       }
    }),
    new HtmlWebpackPlugin({
      template: 'examples/index.html',
      filename: 'index.html',
      inject: false,
      title: 'react upload ie8',
      chunks: ['browser']
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'es3ify-loader'
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.js?$/,
      exclude: /[node_modules|lib]/,
      loader: 'eslint'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    }, {
      test: /\.(woff(2)?|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file-loader?name=i/[name].[ext]'
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
