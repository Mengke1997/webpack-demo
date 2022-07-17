const {SyncHook}=require('tapable')
//类的构造函数可以接收一个可选参数，参数是一个参数名的字符串数组
 let syncHook =new SyncHook(['name','age'])
 //注册  ’on‘的意思
 syncHook.tap("1",(name,age)=>{
    console.log('1',name,age);
 })
 syncHook.tap("2",(name,age)=>{
    console.log('2',name,age);
 })
 syncHook.tap("3",(name,age)=>{
    console.log('3',name,age);
 })
 syncHook.call('zz',12)