// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "build.js",
    format: "umd",
    name: "sonify"
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        "node_modules/lodash/lodash.js": ["maxBy", "minBy", "uniq", "values"]
      }
    }),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
