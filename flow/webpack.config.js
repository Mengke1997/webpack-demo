const path = require('path')
let RunPlugin = require('./plugins/run-plugin')
let DonePlugin = require('./plugins/done-plugin')
let EmitPlugin = require('./plugins/emit-plugin')
module.exports = {
  mode: 'development',
  devtool: false,
  // context: process.cwd(), //上下文：默认为当前工作目录
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // 'logger2-loader.js',//这样写会去node_module里去找
          path.resolve(__dirname, 'loaders', 'logger1-loader.js'), //自定义loader的绝对路径
          path.resolve(__dirname, 'loaders', 'logger2-loader.js'),
        ],
      },
    ],
  },
  plugins: [new RunPlugin(), new DonePlugin(), new EmitPlugin()],
}
