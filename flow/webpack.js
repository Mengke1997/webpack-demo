// const { webpack } = require("webpack")

const Compiler = require('./compiler.js')

function webpack(options) {
  //1.初始化参数，从配置文件中读取配置对象，然后和shell参数进行合并，得到最终的配置对象
  //slice2拿到shell语句的参数，前两个是node环境参数
  let shellOptions = process.argv.slice(2).reduce((config, args) => {
    let [key, value] = args.split('=') //--mode=production
    config[key.slice(2)] = value
    return config
  }, {})

  let finalOptions = { ...options, ...shellOptions }
  //2.用上一步得到的参数对象去初始化compiler对象
  let compiler = new Compiler(finalOptions)
  //3.加载所有配置的插件
  if (finalOptions.plugins && Array.isArray(finalOptions.plugins)) {
    options.plugins.forEach((plugin) => {
      plugin.apply(compiler)
    })
  }

  return compiler
}
module.exports = webpack
