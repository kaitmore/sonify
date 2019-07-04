webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Editor.js":
/*!******************************!*\
  !*** ./components/Editor.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_live__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-live */ "./node_modules/react-live/dist/react-live.es.js");
/* harmony import */ var sonify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sonify */ "./node_modules/sonify/build.js");
/* harmony import */ var sonify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sonify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _VictoryChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VictoryChart */ "./components/VictoryChart.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Player */ "./components/Player.js");
var _jsxFileName = "/Users/kaitmore/Projects/sonify/demo/components/Editor.js";





var scope = {
  React: react__WEBPACK_IMPORTED_MODULE_0___default.a,
  Sonify: sonify__WEBPACK_IMPORTED_MODULE_2___default.a,
  VictoryChart: _VictoryChart__WEBPACK_IMPORTED_MODULE_3__["default"],
  Player: _Player__WEBPACK_IMPORTED_MODULE_4__["default"]
};
var code = "\nclass Example extends React.Component {\n  constructor(...args) {\n    super(...args);\n    this.state = {\n        isPlaying: false\n    }\n\n  }\n\n  render() {\n    const data = [\n      [1536969666906, 1],\n      [1546969674206, 2],\n      [1596966695555, 4.3],\n      [1666959697655, 0],\n      [1576669693906, 3],\n      [1586769694206, 3.4],\n      [1597969694206, 6],\n      [1599969694206, 5],\n      [1600969694206, 4],\n      [1619696669036, 3],\n      [1626969674106, 1.2],\n      [1636966695255, 4.3],\n      [1646959697645, 2.3],\n      [1656669693506, 3],\n      [1666769694216, 3.4],\n      [1677969689206, 6],\n      [1689696242486, 2],\n      [1798869694236, 0.05]\n    ];\n\n    const Sonifier = new Sonify(data, 10, {\n        pitches: [\"A\", \"C#\", \"E\", \"G#\", \"B\"],\n        octaves: 2,\n        baseOctave: 4,\n        glissando: true,\n        staticRhythm: false,\n        onEnded: () => this.setState({ isPlaying: false })\n    });\n\n    return <>\n            <Player\n                onPlay={() => {\n                    Sonifier.play();\n                    this.setState({ isPlaying: true })\n                    }\n                }\n                onStop={() =>  { Sonifier.stop();\n                    this.setState({ isPlaying: false })\n                    }}\n                isPlaying={this.state.isPlaying}\n            />\n            <VictoryChart data={data} />\n       </>\n  }\n}\n";

var Editor = function Editor() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_live__WEBPACK_IMPORTED_MODULE_1__["LiveProvider"], {
    code: code,
    scope: scope,
    id: "editor",
    theme: {
      plain: {
        color: "#d6deeb",
        backgroundColor: "#011627"
      },
      styles: [{
        types: ["changed"],
        style: {
          color: "rgb(162, 191, 252)",
          fontStyle: "italic"
        }
      }, {
        types: ["deleted"],
        style: {
          color: "rgba(239, 83, 80, 0.56)",
          fontStyle: "italic"
        }
      }, {
        types: ["inserted", "attr-name"],
        style: {
          color: "rgb(173, 219, 103)",
          fontStyle: "italic"
        }
      }, {
        types: ["comment"],
        style: {
          color: "rgb(99, 119, 119)",
          fontStyle: "italic"
        }
      }, {
        types: ["string", "url"],
        style: {
          color: "rgb(173, 219, 103)"
        }
      }, {
        types: ["variable"],
        style: {
          color: "rgb(214, 222, 235)"
        }
      }, {
        types: ["number"],
        style: {
          color: "rgb(247, 140, 108)"
        }
      }, {
        types: ["builtin", "char", "constant", "function"],
        style: {
          color: "rgb(130, 170, 255)"
        }
      }, {
        // This was manually added after the auto-generation
        // so that punctuations are not italicised
        types: ["punctuation"],
        style: {
          color: "rgb(199, 146, 234)"
        }
      }, {
        types: ["selector", "doctype"],
        style: {
          color: "rgb(199, 146, 234)",
          fontStyle: "italic"
        }
      }, {
        types: ["class-name"],
        style: {
          color: "rgb(255, 203, 139)"
        }
      }, {
        types: ["tag", "operator", "keyword"],
        style: {
          color: "rgb(127, 219, 202)"
        }
      }, {
        types: ["boolean"],
        style: {
          color: "rgb(255, 88, 116)"
        }
      }, {
        types: ["property"],
        style: {
          color: "rgb(128, 203, 196)"
        }
      }, {
        types: ["namespace"],
        style: {
          color: "rgb(178, 204, 214)"
        }
      }]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_live__WEBPACK_IMPORTED_MODULE_1__["LiveEditor"], {
    style: {
      minWidth: "500px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_live__WEBPACK_IMPORTED_MODULE_1__["LiveError"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_live__WEBPACK_IMPORTED_MODULE_1__["LivePreview"], {
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "#011627"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Editor);

/***/ })

})
//# sourceMappingURL=index.js.6189daa4a85a976b1882.hot-update.js.map