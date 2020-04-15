const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const templatePath = path.join(__dirname, '../public/index.html')

module.exports = webpackMerge(baseConfig, {
  mode: 'none',
  // 把第三方库排除在外
  // externals:{
  //   'react':'React',         // main.js上没有，让它去window上找，这些都来自CDN
  //   'react-dom':'ReactDOM'
  // },
  entry: [
    path.resolve(__dirname, '../src/pageEntry/index/index.js')
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendors',             // 第三方
          test: /(react|react-dom)/,   // 需要分离的包
          chunks: 'all'                // 不区分同步文件还是异步文件统一对待
        }
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: templatePath
    }),
    // new webpack.DllReferencePlugin({
    //   /**
    //    * 在这里引入 manifest 文件
    //    */
    //   manifest: require('../dist/dll/vendor-manifest.json'),
    // })
  ]
});