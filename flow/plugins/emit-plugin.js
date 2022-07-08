class EmitPlugin {
  //每个插件需要有个apply方法
  apply(compiler) {
    //注册emit钩子
    compiler.hooks.emit.tap('EmitPlugin', () => {
      compiler.assets['README.md'] = '请先读我'
      // console.log('挂载EmitPlugin')
    })
  }
}
module.exports = EmitPlugin
