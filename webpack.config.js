const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')

const uglifyJsPlugin = new UglifyJsWebpackPlugin({
  extractComments: true,
  sourceMap: true
})

module.exports = {
  target: 'node',
  entry: "./src/main.js",
  output: {
    path: __dirname + '/build',
    filename: 'main.js'
  },
  mode: 'development',
  plugins: [
    uglifyJsPlugin
  ]
}