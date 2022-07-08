let { SyncHook } = require('tapable')
let fs = require('fs')
let path = require('path')
let { toUnixPath } = require('./utils')
let types = require('babel-types') //判断某个节点是否是某种类型，生成某个新的节点
let parser = require('@babel/parser') //把源码生成ast语法树
let traverse = require('@babel/traverse').default //遍历器
let generator = require('@babel/generator').default //生成器
//拿到配置的根目录
let rootPath = toUnixPath(process.cwd())
class Compiler {
  constructor(options) {
    this.options = options
    this.hooks = {
      run: new SyncHook(), //开启编译
      emit: new SyncHook(), //这个钩子会在写入文件系统的时候触发
      done: new SyncHook(), //编译工作全部完成
    }
    this.entries = new Set() //所有的入口模块，webpack4用的是数组，5用的set
    this.modules = new Set() //所有的模块
    this.chunks = new Set() //所有的代码块
    this.assets = {} //存放的本次要产出的文件
    this.files = new Set() //存放着本次编译所有的产出的文件名
  }
  run(callback) {
    this.hooks.run.call()
    //5.根据配置中的entry找出入口文件
    let entry = {}
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }
    //开始真正的编译

    //6.调用所有配置的loader对模块进行编译
    for (let entryName in entry) {
      let entryPath = toUnixPath(path.join(rootPath, entry[entryName])) //绝对路径
      let entryModule = this.buildModule(entryName, entryPath)
      this.entries.add(entryModule)
      // this.modules.add(entryModule)
      // 8.根据入口和模块的依赖关系，组装成一个个包含多个模块的chunk
      let chunk = {
        name: entryName,
        entryModule,
        modules: Array.from(this.modules).filter(
          (module) => module.name == entryName
        ),
      }
      this.chunks.add(chunk)
    }
    //9.再把每个chunk转换成一个单独的文件加入到输出列表this.assets (对象 key-文件名；值-文件的内容)
    let output = this.options.output
    this.chunks.forEach((chunk) => {
      let filename = output.filename.replace('[name]', chunk.name) //文件名，没有路径
      this.assets[filename] = getSource(chunk)
    })
    this.hooks.emit.call()
    this.files = Object.keys(this.assets) //文件名的一个数组
    for (let file in this.assets) {
      let filePath = path.join(output.path, file) //文件名拼路径
      fs.writeFileSync(filePath, this.assets[file])
    }
    //编译工作就全部结束，就可以触发done的回调
    this.hooks.done.call()
    callback(null, {
      toJson: () => ({
        entries: this.entries,
        chunks: this.chunks,
        modules: this.modules,
        files: this.files,
        assets: this.assets,
      }),
    })
  }
  buildModule(entryName, modulePath) {
    //1.读取出来此模块的内容
    let originalSourceCode = fs.readFileSync(modulePath, 'utf-8') //读取这个模块的原始内容
    let targetSourceCode = originalSourceCode
    // // 2.调用所有配置的loader对模块进行编译
    let rules = this.options.module.rules
    // //得到了本文件模块生效的loader有哪些
    let loaders = []
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].test.test(modulePath)) {
        loaders = [...loaders, ...rules[i].use]
      }
    }
    for (let i = loaders.length - 1; i >= 0; i--) {
      //   //把原始内容传给最后一个loader，再往前推
      targetSourceCode = require(loaders[i])(targetSourceCode)
    }
    // 7.再找出该模块依赖的模块，再递归本步骤直至所有入口依赖的文件都经过本步骤的处理
    // 模块id都是一个相对于根目录的相对路径 ./
    let moduleId = './' + path.posix.relative(rootPath, modulePath)
    let module = { id: moduleId, dependencies: [], name: entryName }
    //找出该模块依赖的模块,把转换后的源码准成抽象语法树
    let ast = parser.parse(targetSourceCode, { sourceType: 'module' })
    traverse(ast, {
      //   //require在ast里是callEXpression-方法表达式
      CallExpression: ({ node }) => {
        if (node.callee.name == 'require') {
          //要引入的模块的相对路径
          let moduleName = node.arguments[0].value //"./title"
          //为了获取要加载的模块的绝对路径，第一步要获取当前模块的所在目录
          let dirName = path.posix.dirname(modulePath)
          let depModulePath = path.posix.join(dirName, moduleName) //拼接成绝对路径
          let extensions = this.options.resolve.extensions
          depModulePath = tryExtensions(
            depModulePath,
            extensions,
            moduleName,
            dirName
          )
          let depModuleId = './' + path.posix.relative(rootPath, depModulePath) //./src/title.js
          node.arguments = [types.stringLiteral(depModuleId)]

          let alreadyModuleIds = Array.from(this.modules).map(
            (module) => module.id
          )
          //如果已经编译过的模块里不包含这个依赖模块，才添加
          if (!alreadyModuleIds.includes(depModuleId)) {
            module.dependencies.push(depModulePath)
          }
        }
      },
    })
    let { code } = generator(ast)
    module._source = code //此模块的源代码
    //把当前的模块编译完后，会找到它的所有依赖，进行递归的编译，添加到this.modules
    module.dependencies.forEach((dependency) => {
      let depModule = this.buildModule(entryName, dependency)
      this.modules.add(depModule)
    })
    return module
  }
}
/**
 *
 * @param {*} modulePath 拼出来的模块路径d:/src/title.js
 * @param {*} extensions 扩展名数组 extensions: ['.js', '.jsx', '.json'],
 * @param {*} originModulePath 原始模块路径  ./title
 * @param {*} moduleContext d:/src
 */
function tryExtensions(
  modulePath,
  extensions,
  originModulePath,
  moduleContext
) {
  extensions.unshift('') //extensions: ['','.js', '.jsx', '.json'],
  for (let i = 0; i < extensions.length; i++) {
    //加上后缀，判断是否存在该文件
    if (fs.existsSync(modulePath + extensions[i])) {
      return modulePath + extensions[i]
    }
  }
  //如果到了这句话还是执行到了，说明没有一个后缀匹配到
  throw new Error(
    `Module not found :Error:can't resolve ${originModulePath} in ${moduleContext}`
  )
}
/**
 *
 * @param {*} chunk 获取chunk对应的源代码，输出的文件内容
 * name 代码块的名字
 * entryModule 入口模块
 * modules 所有的模块
 */
function getSource(chunk) {
  return `
  (() => {
    var modules = ({
        ${chunk.modules
          .map(
            (module) => `
            "${module.id}":
            ((module) => {
                    ${module._source}
            })
        `
          )
          .join(',')}
    })
    var cache = {}
    function require(moduleId) {
      var cachedModule = cache[moduleId]
      if (cachedModule !== undefined) {
        return cachedModule.exports
      }
      var module = cache[moduleId] = {
        exports: {}
      }
      modules[moduleId](module, module.exports, require)
      return module.exports
    }
    var exports = {};
    (() => {
            ${chunk.entryModule._source}
    })()
  })()
  `
}

module.exports = Compiler
