const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  resolveLoader: {
    alias: {
      //别名
      'babel-loader2': path.resolve(
        __dirname,
        'webpack-loaders/babel-loader2.js'
      ),
      'file-loader2': path.resolve(
        __dirname,
        'webpack-loaders/file-loader2.js'
      ),
      'url-loader2': path.resolve(
        __dirname,
        'webpack-loaders/url-loader2.js'
      ),
    },
    //指定一个模块的目录，找不到会去node_modules里找
    modules: [path.resolve(__dirname, 'webpack-loaders'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader2',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      }, {
        test: /(jpg|png|jpeg)/,
        use: [
          {
            loader: 'url-loader2',
            options: {
              limit:1024*8,
              fallback:path.resolve(__dirname,'webpack-loaders/file-loader2.js')
            },
          },
        ],
      },{
        test:/\.less$/,
        use:[
          'style-loader2',
          'less-loader2'
        ]
      }
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
