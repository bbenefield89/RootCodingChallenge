const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const uglifyJsPlugin = new UglifyJsPlugin({
  extractComments: true,
  sourceMap: true
})

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + '/build',
    filename: 'main.js'
  },
  devtool: 'sourcemap',
  mode: 'development',
  plugins: [
    uglifyJsPlugin
  ]
}