function loader(source) {
  console.log('inline1')
  return source + '//inline1'
}
// loader.pitch = function () {
//   console.log('inline1-pitch')
// }
// 是否要转成字符串  raw为true表示传递给loader的时候是一个buffer，比如传递图片

loader.raw = true
module.exports = loader
