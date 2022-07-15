/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/images/6.jpeg":
/*!***************************!*\
  !*** ./src/images/6.jpeg ***!
  \***************************/
/***/ (() => {

throw new Error("Module build failed (from ./webpack-loaders/url-loader2.js):\nTypeError: mime.getType is not a function\n    at Object.loader (/Users/zmk/Documents/学习/webpack/webpack-demo/loader/webpack-loaders/url-loader2.js:18:23)");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// require('inline1-loader!inline2-loader!./title')
// console.log(11);
// let arrow = () => {
//   console.log('arrow')
// }
// arrow()
let logoSrc = __webpack_require__(/*! ./images/6.jpeg */ "./src/images/6.jpeg");

let image = new Image();
image.src = logoSrc;
document.body.appendChild(image);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map