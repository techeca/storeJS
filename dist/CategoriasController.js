/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controllers/CategoriasController.js":
/*!*************************************************!*\
  !*** ./src/Controllers/CategoriasController.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CategoriasController)\n/* harmony export */ });\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar CategoriasController = /*#__PURE__*/_createClass(function CategoriasController(model, view) {\n  var _this = this;\n\n  _classCallCheck(this, CategoriasController);\n\n  _defineProperty(this, \"onCategoriasChanged\", function (categorias) {\n    _this.view.mostrarCategorias(categorias);\n  });\n\n  _defineProperty(this, \"onProductosChanged\", function (productos) {\n    if (productos.productos.length > 0) {\n      _this.view.insertarProductosEnContainer(productos);\n    } else {\n      _this.view.mensajeEnProductContent('No tenemos ese Producto :(');\n    }\n  });\n\n  _defineProperty(this, \"cambiarCategoria\", function (id) {\n    _this.model.obtenerProductosPorCategoria(id);\n  });\n\n  _defineProperty(this, \"cambiarPagina\", function (id, page) {\n    _this.model.obtenerProductosPorCategoria(id, page);\n  });\n\n  _defineProperty(this, \"buscarPorNombre\", function (name) {\n    if (name.length > 0) {\n      _this.model.obtenerProductosPorNombre(name);\n    } else {\n      _this.view.mensajeEnProductContent('Debes ingresar un texto para poder buscar :/');\n    }\n  });\n\n  this.model = model;\n  this.view = view;\n  this.model.rellenarContenido(this.onProductosChanged);\n  this.view.cambiarCategoria(this.cambiarCategoria);\n  this.view.cambiarPagina(this.cambiarPagina);\n  this.view.buscarProducto(this.buscarPorNombre); //Se obtienen las categorías desde modelo\n\n  this.onCategoriasChanged(this.model.categorias);\n});\n\n\n\n//# sourceURL=webpack://Simple_Store_-_Frontend/./src/Controllers/CategoriasController.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/Controllers/CategoriasController.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;