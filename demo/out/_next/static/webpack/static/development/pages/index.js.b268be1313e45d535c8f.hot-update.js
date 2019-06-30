webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/VictoryChart.js":
/*!************************************!*\
  !*** ./components/VictoryChart.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var victory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! victory */ "./node_modules/victory/es/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "/Users/kaitmore/Projects/sonify/demo/components/VictoryChart.js";




var VictoryChartRenderer = function VictoryChartRenderer(_ref) {
  var data = _ref.data;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_2__["VictoryChart"], {
    padding: {
      top: 20,
      bottom: 60,
      left: 40,
      right: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_2__["VictoryAxis"], {
    dependentAxis: true,
    style: {
      axis: {
        stroke: "#fff"
      },
      tickLabels: {
        fontFamily: "arial",
        fontSize: "10px",
        padding: 5,
        textAnchor: "end",
        fill: "#ff"
      }
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_2__["VictoryAxis"], {
    tickFormat: function tickFormat(x) {
      return moment__WEBPACK_IMPORTED_MODULE_3___default()(new Date(x)).format("L");
    },
    style: {
      axis: {
        stroke: "#fff"
      },
      tickLabels: {
        fontFamily: "arial",
        fontSize: "8px",
        angle: 35,
        padding: 3,
        textAnchor: "start"
      }
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(victory__WEBPACK_IMPORTED_MODULE_2__["VictoryLine"], {
    style: {
      data: {
        stroke: "#c43a31"
      },
      parent: {
        border: "1px solid #ccc"
      }
    },
    data: data.map(function (_ref2) {
      var _ref3 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, 2),
          x = _ref3[0],
          y = _ref3[1];

      return {
        x: x,
        y: y
      };
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (VictoryChartRenderer);

/***/ })

})
//# sourceMappingURL=index.js.b268be1313e45d535c8f.hot-update.js.map