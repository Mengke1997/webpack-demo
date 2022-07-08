let webpack = require('./webpack.js')
const options = require('./webpack.config.js')
//总的编译对象
debugger
let compiler = webpack(options)
//4.调用compiler对象的run方法 开始执行编译工作
compiler.run((err, stats) => {
  console.log(err)
  //过滤states的信息
  console.log(
    stats.toJson({
      entries: true, //入口信息
      modules: true, //模块信息
      chunks: true, //代码块
      assets: true, //产出的资源
      files: true, //最后生成了哪些文件
    })
  )
})
