const {SyncBailHook}=require('tapable')
//类的构造函数可以接收一个可选参数，参数是一个参数名的字符串数组
 let syncBailHook =new SyncBailHook(['name','age'])
 //注册  ’on‘的意思
 syncBailHook.tap("1",(name,age)=>{
    console.log('1',name,age);
 })
 syncBailHook.tap("2",(name,age)=>{
    console.log('2',name,age);
    return 2//有return，则后面的都不再执行
 })
 syncBailHook.tap("3",(name,age)=>{
    console.log('3',name,age);
 })
 syncBailHook.call('zz',12)