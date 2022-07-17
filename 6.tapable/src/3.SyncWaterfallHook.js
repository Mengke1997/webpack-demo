const {SyncWaterfallHook}=require('tapable')
//类的构造函数可以接收一个可选参数，参数是一个参数名的字符串数组
 let hook =new SyncWaterfallHook(['name','age'])
 //注册  ’on‘的意思
 hook.tap("1",(name,age)=>{
    console.log('1',name,age);
 })
 hook.tap("2",(name,age)=>{
    console.log('2',name,age);
    return 2
 })
 hook.tap("3",(name,age)=>{
    console.log('3',name,age);
 })
 hook.call('zz',12)