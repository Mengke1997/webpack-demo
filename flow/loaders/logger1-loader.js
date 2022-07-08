/**
 * loader其实就是一个函数，接收原始内容，返回转换后的内容
 * @param {*} source
 */

function loader(source) {
  // console.log('logger1-loader')
  return source + '//logger1'
}
module.exports = loader
