function loader(source) {
  // console.log(this)
  //this.async()可以把loader变成异步，在用callback回调
  let callback = this.async()
  callback()
  console.log('post2')
  return source + '//post2'
}
// loader.pitch = function () {
//   console.log('post2-pitch')
// }
module.exports = loader
