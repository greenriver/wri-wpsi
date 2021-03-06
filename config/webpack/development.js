process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

environment.loaders.append('eslint', {
  test: /\.(js|ts)x?$/,
  exclude: /node_modules/,
  use: [{loader: 'eslint-loader'}],
})

module.exports = environment.toWebpackConfig()
