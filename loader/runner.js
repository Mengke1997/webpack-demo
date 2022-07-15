// let { runLoaders } = require('./loader-runner')
let { runLoaders } = require('loader-runner')
let path = require('path')
let fs = require('fs')
let filePath = path.resolve(__dirname, 'src', 'index.js') //入口模块

//写在require的loader被称为行内loader
let request = `inline1-loader!inline2-loader!${filePath}`
//不同的loader并不是loader的类型属性，而是你在使用的时候使用了什么样的enforce
let rules = [
  {
    test: /\.js$/,
    use: ['normal1-loader', 'normal2-loader'],
  },
  {
    test: /\.js$/,
    enforce: 'pre',
    use: ['pre1-loader', 'pre2-loader'],
  },
  {
    test: /\.js$/,
    enforce: 'post',
    use: ['post1-loader', 'post2-loader'],
  },
]
let parts = request.replace(/^`?!+/, '').split('!') //['inline1-loader','inline2-loader','src/index.js']
let resource = parts.pop() //'src/index.js'
//解析loader的绝对路径
let resolveLoader = (loader) => path.resolve(__dirname, 'loaders', loader)
let inlineLoaders = parts
let preLoaders = [],
  normalLoaders = [],
  postLoaders = []
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i]
  if (rule.test.test(resource)) {
    if (rule.enforce == 'pre') {
      preLoaders.push(...rule.use)
    } else if (rule.enforce == 'post') {
      postLoaders.push(...rule.use)
    } else {
      normalLoaders.push(...rule.use)
    }
  }
}
let loaders = [] //表示最终生效的loader
if (request.startsWith('!!')) {
  loaders = [...inlineLoaders]
} else if (request.startsWith('-!')) {
  loaders = [...postLoaders, ...inlineLoaders]
} else if (request.startsWith('!')) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders]
}
loaders = loaders.map(resolveLoader)
debugger
runLoaders(
  {
    resource, //要加载和转换的模块
    loaders, //loader的绝对路径数组
    context: { name: 'zz' }, //基础的上下文对象
    readResource: fs.readFile.bind(fs), //读取硬盘文件的方法
  },
  (err, result) => {
    console.log(err)
    console.log(result)
  }
)
