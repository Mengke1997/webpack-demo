let less =require('less')
function loader(source){
    //同步改异步
    let callback=this.async()
    less.render(source,{filename:this.resource},(err,output)=>{
        callback(err,output.css)
    })
    return 
}
module.exports=loader