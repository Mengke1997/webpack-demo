class RunPlugin {
  //每个插件需要有个apply方法
  apply(compiler) {
    //注册run钩子
    compiler.hooks.run.tap('RunPlugin', () => {
      // console.log('挂载RunPlugin')
    })
  }
}
module.exports = RunPlugin
