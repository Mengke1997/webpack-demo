
  (() => {
    var modules = ({
        
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
            let title = require("./src/title.js");

console.log('entry2', title); //logger2//logger1
    })()
  })()
  