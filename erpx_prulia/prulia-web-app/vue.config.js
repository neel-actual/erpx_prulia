const BomPlugin = require('webpack-utf8-bom')
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  parallel: true,
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://167.99.77.197',
        changeOrigin: true,
        secure: false
      },
      '/files/': {
        target: 'http://167.99.77.197',
        changeOrigin: true,
        secure: false
      }
    }
  }
}

if (!isDev) {
  config.publicPath = '/beta/'
  config.configureWebpack = {
    plugins: [new BomPlugin(true)],
    optimization: {
      
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: { output: { ascii_only: true } }
        })
      ]
    }
  }
}

module.exports = config
