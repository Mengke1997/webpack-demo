const babel = require('@babel/core')

/**
 * 根据老代码 生成新代码
 * @param {*} source
 * @returns
//  */
const { getOptions } = require('loader-utils')
function loader(source,inputSourceMap,data) {
  //取webpack配置项里的options
  // let options = getOptions(this) || {}
  let options =  {}
  options.sourceMaps = true
  options.inputSourceMap=inputSourceMap//把前一个loader传过来的sourcemap接着往下传
  options.filename=this.request.split('!').pop().split('/').pop()//拿到文件名
  // options.filename=//拿到文件名
  let { code, map, ast } = babel.transform(source, options)
  //如果想给下一个loader返回多个值的话，就可以使用callback（loaderContext的callback）
  this.callback(null, code, map, ast)
}
module.exports = loader
