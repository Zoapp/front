/* eslint import/no-extraneous-dependencies: 0 */
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const webpack = require("webpack");

// eslint-disable-next-line no-undef
module.exports = merge(commonConfig, {
  mode: "production",
  entry: {
    app: "./client/index.js",
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
});
