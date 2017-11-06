const { join, resolve } = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  source: resolve(__dirname, '../src'),
  build: resolve(__dirname, '../dist'),
};

module.exports = {
  context: paths.source,

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'index.jsx',
  ],

  output: {
    filename: 'henk.js',
    // the output bundle

    path: paths.build,

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    hot: true,
    // enable HMR on the server

    host: 'localhost',
    port: 3000,

    contentBase: paths.build,
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    historyApiFallback: true
    // fallback to root for other urls
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    // Generate minified HTML page from template with all CSS/JS imports.
    new HtmlWebpackPlugin({
      title: 'Henk.js',
      template: resolve(__dirname, '../public/index.html'),
    }),


    new ExtractTextPlugin({
      disable: false,
      filename: 'henk.css',
      allChunks: true
    }),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ],
}
