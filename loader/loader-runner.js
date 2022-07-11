let fs = require('fs')

function createLoaderObject(loader) {
  let loaderObj = {
    request:null, //loader的一个绝对路径
    normal: null, //loader函数本身
    pitch: null, //loader的pitch函数
    raw: false, //是否要转成字符串  raw为true表示传递给loader的时候是一个buffer，比如传递图片
    data: {}, //每一个laoder都会有一个自定义的数据对象，用来存放一些自定义信息
    pitchExecuted: false, //这个loader的pitch方法是不是已经执行了
    normalExecutes: false, //这个loader函数是否已经执行
  }
  loaderObj.request = loader
  let normal = require(loaderObj.request) //加载这个loader模块
  loaderObj.normal = normal
  loaderObj.pitch = normal.pitch
  loaderObj.raw = normal.raw
  return loaderObj

}
//读取文件
function processResource(processOptions,loaderContext,finalCallback){
  loaderContext.loaderIndex=loaderContext.loaderIndex-1
  let resource=loaderContext.resource
  loaderContext.readResource(resource,(err,resourceBuffer)=>{
    if(err) return finalCallback(err)
    processOptions.resourceBuffer=resourceBuffer
    console.log(resourceBuffer.toString());
    //这一步已经读完pitch，获取到文件，下一步该执行normal
  })
}
//执行流程
function iteratePitchingLoaders(processOptions,loaderContext,finalCallback){
  if(loaderContext.loaderIndex>=loaderContext.loaders.length){
    return processResource(processOptions,loaderContext,finalCallback)
  }
  let currentLoaderObject=loaderContext.loaders[loaderContext.loaderIndex]
  if(currentLoaderObject.pitchExecuted){
    loaderContext.loaderIndex++
    return iteratePitchingLoaders(processOptions,loaderContext,finalCallback)

  }

  let pitchFunction=currentLoaderObject.pitch
  currentLoaderObject.pitchExecuted=true //表示pitch函数已经处理过
  if(!pitchFunction){//如果此loader没有提供pitch方法
    return iteratePitchingLoaders(processOptions,loaderContext,finalCallback)
  }

}

function runLoaders(options, callback) {
  let resource = options.resource //获取要加载的资源
  let loaders = options.loaders || [] //要经过哪些loader进行处理
  let loaderContext = options.context || {} //loader的执行上下文
  let readResource = options.readResource || fs.readFile //读取文件内容的方法
  //把每个loader从一个loader绝对路径默认成一个loader对象
  let loaderObjects = loaders.map(createLoaderObject)
  loaderContext.resource = resource
  loaderContext.readResource = readResource
  loaderContext.loaderIndex = 0 //当前正在执行的loader的索引
  loaderContext.loaders = loaderObjects //loader对象的数组
  loaderContext.callback = null
  loaderContext.async = null
  
  Object.defineProperty(loaderContext,'request',{
    get(){
      return loaderContext.loaders.map(l=>l.request).concat(loaderContext.resource).join('!')
    }
  })
  Object.defineProperty(loaderContext,'remainingRequest',{
    get(){
      return loaderContext.loaders.slice(loaderContext.loaderIndex+1).map(l=>l.request).concat(loaderContext.resource).join('!')
    }
  })
  Object.defineProperty(loaderContext,'currentRequest',{
    get(){
      return loaderContext.loaders.slice(loaderContext.loaderIndex).map(l=>l.request).concat(loaderContext.resource).join('!')
    }
  })
  Object.defineProperty(loaderContext,'previousRequest',{
    get(){
      return loaderContext.loaders.slice(0,loaderContext.loaderIndex).map(l=>l.request).join('!')
    }
  })
  
  Object.defineProperty(loaderContext,'data',{
    get(){
      return loaderContext.loaders[loaderContext.loaderIndex].data
    }
  })

  let processOptions={
    resourceBuffer:null,//要读取的资源的二进制内容，转换前的
  }
  //开始执行流程
  iteratePitchingLoaders(processOptions,loaderContext,(err,result)=>{
    callback(err,{
      result,
      resourceBuffer:processOptions.resourceBuffer
    })
  })
}
exports.runLoaders = runLoaders
