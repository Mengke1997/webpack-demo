class DonePlugin {
  //每个插件需要有个apply方法
  apply(compiler) {
    //挂载 阶段
    //注册DonePlugin钩子
    compiler.hooks.done.tap('DonePlugin', () => {
      //执行阶段
      // console.log('DonePlugin')
    })
  }
}
module.exports = DonePlugin
