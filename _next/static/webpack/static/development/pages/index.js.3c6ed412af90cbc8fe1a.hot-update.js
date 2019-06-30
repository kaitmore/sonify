webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Player.js":
/*!******************************!*\
  !*** ./components/Player.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/kaitmore/Projects/sonify/demo/components/Player.js";


var Player = function Player(_ref) {
  var onPlay = _ref.onPlay,
      onStop = _ref.onStop,
      isPlaying = _ref.isPlaying;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return isPlaying ? onStop() : onPlay();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    role: "img",
    "aria-label": "play",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, "\u25B6\uFE0F"), isPlaying ? "Stop" : "Listen"));
};

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ })

})
//# sourceMappingURL=index.js.3c6ed412af90cbc8fe1a.hot-update.js.map