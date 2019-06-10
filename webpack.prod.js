/* eslint import/no-extraneous-dependencies: 0 */
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

// eslint-disable-next-line no-undef
module.exports = merge(commonConfig, {
  mode: "production",
  entry: {
    app: "./client/index.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 8,
          safari10: true,
          output: {
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
      }),
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
});
