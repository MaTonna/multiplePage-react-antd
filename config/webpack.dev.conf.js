const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../src/styles'),
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader
          // loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ],
  devServer: {
    port: 9000,
    open: true,
    index: '../public/index.html',
    hot: true,
  }
});
