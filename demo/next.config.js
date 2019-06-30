const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssModules: false,
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/sonify" : ""
});
