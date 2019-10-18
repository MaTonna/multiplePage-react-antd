const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DynamicPublicPathPlugin = require("./webpack-dynamic.js");
const PUBLIC_PATH = 'http://img-worker.legendsoa.com';

const htdocsPath = '../../htdocs/static';
module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: PUBLIC_PATH,
    path: path.resolve(__dirname, htdocsPath),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
  },
  optimization: {
    minimizer: [new TerserPlugin({
      test: /\.(ts|js)x?$/,
      exclude: /\/node_modules/,
      parallel: true,
    })],
  },
  plugins: [
    // build前先删除css和js中的文件，因为会生成带有hash的文件，文件会重复
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${htdocsPath}/css/*.*`, `${htdocsPath}/js/*.*`, `!${htdocsPath}/lib`],
      verbose: true,
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new DynamicPublicPathPlugin({
      oldPublicPath: PUBLIC_PATH,
      publicPath: 'window.CONFIG.resourcePath',
      outputPath: path.resolve(__dirname, htdocsPath)
    }),
  ]
});
