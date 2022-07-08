let path = require('path')
let { toUnixPath } = require('../flow/utils')
let cwd = toUnixPath(process.cwd())
console.log(cwd) //  d:/exam/webpack/flow
let entry1 = toUnixPath(path.join(cwd, './src/entry1.js'))
console.log(entry1) //  d:/exam/webpack/flow/src/entry1.js

//通过上下文和绝对路径 ==> 获取相对路径
console.log(path.posix.relative(cwd, entry1)) //  src/entry1.js

//posix:统一成左杠

/**
 * path
 * join 连接两个路径
 * resolve 从相对路径得到绝对路径
 * relative 得到两个路径的相对路径
 *
 */
