webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/VictoryChart.js":
/*!************************************!*\
  !*** ./components/VictoryChart.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var victory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! victory */ "./node_modules/victory/es/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);


var _jsxFileName = "/Users/kaitmore/Projects/sonify/demo/components/VictoryChart.js";




var VictoryChartRenderer = function VictoryChartRenderer(_ref) {
  var _React$createElement;

  var data = _ref.data;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_3__["VictoryChart"], (_React$createElement = {
    padding: {
      top: 20,
      bottom: 60,
      left: 40,
      right: 20
    }
  }, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement, "padding", 25), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement, "__source", {
    fileName: _jsxFileName,
    lineNumber: 6
  }), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement, "__self", this), _React$createElement), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_3__["VictoryAxis"], {
    dependentAxis: true,
    style: {
      axis: {
        stroke: "rgb(214, 222, 235)"
      },
      tickLabels: {
        fontFamily: "arial",
        fontSize: "6px",
        padding: 5,
        textAnchor: "end",
        fill: "rgb(214, 222, 235)"
      }
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_3__["VictoryAxis"], {
    tickFormat: function tickFormat(x) {
      return moment__WEBPACK_IMPORTED_MODULE_4___default()(new Date(x)).format("L");
    },
    style: {
      axis: {
        stroke: "rgb(214, 222, 235)"
      },
      tickLabels: {
        fontFamily: "arial",
        fontSize: "6px",
        angle: 35,
        padding: 3,
        textAnchor: "start",
        fill: "rgb(214, 222, 235)"
      }
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_3__["VictoryLine"], {
    style: {
      data: {
        stroke: "#c43a31"
      },
      parent: {
        border: "1px solid #ccc"
      }
    },
    data: data.map(function (_ref2) {
      var _ref3 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, 2),
          x = _ref3[0],
          y = _ref3[1];

      return {
        x: x,
        y: y
      };
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (VictoryChartRenderer);

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ })

})
//# sourceMappingURL=index.js.d11e47e3972d8749803a.hot-update.js.map