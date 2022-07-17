const {AsyncParallelBailHook} =require('tapable')

 let hook =new AsyncParallelBailHook(['name','age',])
 //注册  ’on‘的意思
 //注册异步任务(可以使用回调或者promise)，然后全部的一步任务完成后执行回调，类似于Promise.all
 console.time('cost')
//  hook.tapAsync("1",(name,age,callback)=>{
//     setTimeout(()=>{
//       console.log('1',name,age);
//       callback()
//     },1000)
//  })
//  hook.tapAsync("2",(name,age,callback)=>{
//    setTimeout(()=>{
//      console.log('2',name,age);
//      callback()
//    },1000)
// })
//  hook.tapAsync("3",(name,age,callback)=>{
//    setTimeout(()=>{
//      console.log('3',name,age);
//      callback()
//    },1000)
// })
//  hook.callAsync('zz',12,(err)=>{
//    console.log('ok');
//    console.timeEnd('cost')
//  })

 hook.tapPromise('1',function(name,age){
   return new Promise((resolve,reject)=>{
      setTimeout(()=>{
         console.log('1',name,age);
         resolve()
       },1000)
   })
 })
 hook.tapPromise('2',function(name,age){
   return new Promise((resolve,reject)=>{
      setTimeout(()=>{
         console.log('2',name,age);
         resolve()
       },2000)
   })
 })
 hook.tapPromise('3',function(name,age){
   return new Promise((resolve,reject)=>{
      setTimeout(()=>{
         console.log('3',name,age);
         resolve()
       },3000)
   })
 })
 hook.promise('z',18).then(()=>{
   console.timeEnd('cost')
 })