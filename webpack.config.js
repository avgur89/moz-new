'use strict';

const webpack        = require('webpack');
const path           = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {

  // Entry point
  entry: {
    'js/index': './src/js/index'
  },

  // Output settings
  output: {
    filename: '[name].js'
  },

  externals: {
    'jquery': "jQuery"
  },

  // Webpack's plugins
  plugins: [
    new WebpackMd5Hash(),

    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),

    new webpack.NoEmitOnErrorsPlugin(),
  ],

  // Configure module loading (paths, default paths)
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    // Configure file loaders
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/, path.resolve(__dirname, 'src/js/modules/dep')],
      options: {
        presets: ['es2015', 'stage-2']
      }
    },
    {test: /modernizr/, loader: 'imports-loader?this=>window!exports-loader?window.Modernizr'}]
  }
};
