module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("RNiq");


/***/ }),

/***/ "HI6E":
/***/ (function(module, exports) {

module.exports = require("sonify");

/***/ }),

/***/ "J3/a":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/get-iterator");

/***/ }),

/***/ "R2Q7":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/is-array");

/***/ }),

/***/ "RNiq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./components/GithubCorner.js
 // Taken from http://tholman.com/github-corners/

var GithubCorner_GithubCorner = function GithubCorner() {
  return external_react_default.a.createElement("a", {
    href: "https://github.com/kaitmore/sonify",
    className: "github-corner",
    "aria-label": "View source on GitHub",
    target: "_blank",
    rel: "noopener noreferrer"
  }, external_react_default.a.createElement("svg", {
    width: "80",
    height: "80",
    viewBox: "0 0 250 250",
    style: {
      fill: "#151513",
      color: "#fff",
      position: "absolute",
      top: 0,
      border: 0,
      right: 0,
      zIndex: 2
    },
    "aria-hidden": "true"
  }, external_react_default.a.createElement("path", {
    d: "M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
  }), external_react_default.a.createElement("path", {
    d: "M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",
    fill: "currentColor",
    style: {
      transformOrigin: "130px 106px"
    },
    className: "octo-arm"
  }), external_react_default.a.createElement("path", {
    d: "M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",
    fill: "currentColor",
    className: "octo-body"
  })));
};

/* harmony default export */ var components_GithubCorner = (GithubCorner_GithubCorner);
// EXTERNAL MODULE: external "react-live"
var external_react_live_ = __webpack_require__("Rwo+");

// EXTERNAL MODULE: external "sonify"
var external_sonify_ = __webpack_require__("HI6E");
var external_sonify_default = /*#__PURE__*/__webpack_require__.n(external_sonify_);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("p0XB");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js

function _arrayWithHoles(arr) {
  if (is_array_default()(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js
var get_iterator = __webpack_require__("XXOK");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = get_iterator_default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: external "victory"
var external_victory_ = __webpack_require__("wL32");

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./components/VictoryChart.js





var VictoryChart_VictoryChartRenderer = function VictoryChartRenderer(_ref) {
  var data = _ref.data;
  return external_react_default.a.createElement(external_victory_["VictoryChart"], {
    padding: {
      top: 20,
      bottom: 60,
      left: 40,
      right: 20
    }
  }, external_react_default.a.createElement(external_victory_["VictoryAxis"], {
    dependentAxis: true,
    style: {
      axis: {
        stroke: "#000"
      },
      tickLabels: {
        fontFamily: "arial",
        fontSize: "10px",
        padding: 5,
        textAnchor: "end"
      }
    }
  }), external_react_default.a.createElement(external_victory_["VictoryAxis"], {
    tickFormat: function tickFormat(x) {
      return external_moment_default()(new Date(x)).format("L");
    },
    style: {
      axis: {
        stroke: "#000"
      },
      tickLabels: {
        fontFamily: "arial",
        fontSize: "8px",
        angle: 35,
        padding: 3,
        textAnchor: "start"
      }
    }
  }), external_react_default.a.createElement(external_victory_["VictoryLine"], {
    style: {
      data: {
        stroke: "#c43a31"
      },
      parent: {
        border: "1px solid #ccc"
      }
    },
    data: data.map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          x = _ref3[0],
          y = _ref3[1];

      return {
        x: x,
        y: y
      };
    })
  }));
};

/* harmony default export */ var VictoryChart = (VictoryChart_VictoryChartRenderer);
// CONCATENATED MODULE: ./components/Player.js


var Player_Player = function Player(_ref) {
  var onPlay = _ref.onPlay,
      onStop = _ref.onStop,
      isPlaying = _ref.isPlaying;
  return external_react_default.a.createElement(external_react_default.a.Fragment, null, external_react_default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return isPlaying ? onStop() : onPlay();
    }
  }, external_react_default.a.createElement("span", {
    role: "img",
    "aria-label": "play"
  }, "\u25B6\uFE0F"), isPlaying ? "Stop" : "Listen"));
};

/* harmony default export */ var components_Player = (Player_Player);
// CONCATENATED MODULE: ./components/Editor.js





var scope = {
  React: external_react_default.a,
  Sonify: external_sonify_default.a,
  VictoryChart: VictoryChart,
  Player: components_Player
};
var code = "\nclass Example extends React.Component {\n  constructor(...args) {\n    super(...args);\n    this.state = {\n        isPlaying: false\n    }\n\n  }\n\n  render() {\n    const data = [\n      [1536969666906, 1],\n      [1546969674206, 2],\n      [1596966695555, 4.3],\n      [1666959697655, 0],\n      [1576669693906, 3],\n      [1586769694206, 3.4],\n      [1597969694206, 6],\n      [1599969694206, 5],\n      [1600969694206, 4],\n      [1619696669036, 3],\n      [1626969674106, 1.2],\n      [1636966695255, 4.3],\n      [1646959697645, 2.3],\n      [1656669693506, 3],\n      [1666769694216, 3.4],\n      [1677969689206, 6],\n      [1689696242486, 2],\n      [1798869694236, 0.05]\n    ];\n\n    const Sonifier = new Sonify(data, 10, {\n        pitches: [\"A\", \"C#\", \"E\", \"G#\", \"B\"],\n        octaves: 2,\n        baseOctave: 4,\n        glissando: true,\n        staticRhythm: false,\n        onEnded: () => this.setState({ isPlaying: false })\n    });\n\n    return <>\n            <Player\n                onPlay={() => {\n                    Sonifier.play();\n                    this.setState({ isPlaying: true })\n                    }\n                }\n                onStop={() =>  { Sonifier.stop();\n                    this.setState({ isPlaying: false })\n                    }}\n                isPlaying={this.state.isPlaying}\n            />\n            <VictoryChart data={data} />\n       </>\n  }\n}\n";

var Editor_Editor = function Editor() {
  return external_react_default.a.createElement(external_react_live_["LiveProvider"], {
    code: code,
    scope: scope
  }, external_react_default.a.createElement(external_react_live_["LiveEditor"], null), external_react_default.a.createElement(external_react_live_["LiveError"], null), external_react_default.a.createElement(external_react_live_["LivePreview"], null));
};

/* harmony default export */ var components_Editor = (Editor_Editor);
// CONCATENATED MODULE: ./pages/index.js



var pages_data = [[1536969666906, 1], [1546969674206, 2], [1596966695555, 4.3], [1666959697655, 0], [1576669693906, 3], [1586769694206, 3.4], [1597969694206, 6], [1599969694206, 5], [1600969694206, 4], [1619696669036, 3], [1626969674106, 1.2], [1636966695255, 4.3], [1646959697645, 2.3], [1656669693506, 3], [1666769694216, 3.4], [1677969689206, 6], [1689696242486, 2], [1798869694236, 0.05]];
/* harmony default export */ var pages = __webpack_exports__["default"] = (function () {
  return external_react_default.a.createElement("div", {
    style: {
      textAlign: "center",
      height: "100%",
      display: "flex"
    }
  }, external_react_default.a.createElement(components_GithubCorner, null), external_react_default.a.createElement("h1", null, "sonify demo"), external_react_default.a.createElement(components_Editor, null));
});

/***/ }),

/***/ "Rwo+":
/***/ (function(module, exports) {

module.exports = require("react-live");

/***/ }),

/***/ "XXOK":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("J3/a");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "p0XB":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("R2Q7");

/***/ }),

/***/ "wL32":
/***/ (function(module, exports) {

module.exports = require("victory");

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ })

/******/ });