/**
 * url-loader其实是基于file-loader的
 * 如果文件大小高于阈值，走file-loader
 * 如果文件大小低于阈值，会变成base64字符串，内嵌到html
 */
const mime=require('mime')
const { getOptions, interpolateName } = require("loader-utils");
function loader(content) {
  //读到的文件内容
  // let options=getOptions(this)||{}
  let options = {};
  let { limit, fallback = "file-loader2" } = options;
  if (limit) {
    limit = parseInt(limit, 10);
  }
  if(!limit || content.length<limit){//转base64
    let mimeType=mime.getType(this.resourcePath)//resourcePath就是要加载的文件路径
    let base64Str='data:'+mimeType+';base64,'+content.toString('base64');
    return `module.exports=${JSON.stringify(base64Str)}`
  }else{
    let fileLoader2=require(fallback)
    return fileLoader2.call(this,content)
  }
}
loader.raw=true
module.exports=loader
