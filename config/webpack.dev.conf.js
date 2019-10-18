const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htdocsPath = '../static';
module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, htdocsPath),
    historyApiFallback: true,
    port: 9000,
    open: true,
    index: `${htdocsPath}/index.html/**`,
    hot: false,
  }
});
