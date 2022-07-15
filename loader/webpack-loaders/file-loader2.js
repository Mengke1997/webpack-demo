/**
 * 1.通过interpolateName先生成一个新的文件名，文件名根据配置项的options.name以及文件内容生成一个唯一的文件名（一般配置会带上hash，否则会冲突）
 * 2.通过emitFile告诉webpack我要创建一个文件，webpack会根据参数创建到目标路径里去  //public path目录下
 * 3.返回module.exports=${JSON.stringify(filename)} 这样就会把原来的文件路径替换为编译后的路径
 */
const {getOptions,interpolateName} =require('loader-utils')
function loader(content){//读到的文件内容
    // let options=getOptions(this)||{}
    let options={}
    //生成打包后的文件名，（在这个方法里会计算hash值
    let filename=interpolateName(this,options.filename,{
        content
    })
    //告诉webpack把这个文件拷贝到目标目录 Compiler.assets[filename]=content
    this.emitFile(filename,content)
    return `module.exports=${JSON.stringify(filename)}`
}
loader.raw=true
module.exports=loader
