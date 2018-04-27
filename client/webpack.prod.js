const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [new CleanWebpackPlugin(['dist'])],
  performance: {
    maxEntrypointSize: 400000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]\bbabel-polyfill|\bredux|\breact-redux|\bregenerator-runtime|\bstyle-loader/
        }
      }
    }
  }
})
