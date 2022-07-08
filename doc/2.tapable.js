// let { SyncHook } = require('tapable')
//node events EventEmitter
class SyncHook {
  constructor() {
    this.taps = []
  }
  //注册
  tap(name, fn) {
    this.taps.push(fn)
  }
  //触发
  call() {
    this.taps.forEach((tap) => {
      tap()
    })
  }
}

let Hook = new SyncHook()
Hook.tap('a', () => {
  console.log('a')
})
Hook.tap('b', () => {
  console.log('b')
})
Hook.tap('c', () => {
  console.log('c')
})
Hook.call()
