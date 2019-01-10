/* eslint import/no-extraneous-dependencies: 0 */
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

// eslint-disable-next-line no-undef
module.exports = merge(commonConfig, {
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:3031",
    "webpack/hot/only-dev-server",
    "./client/index.js",
  ],
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "./dist/public"), // eslint-disable-line no-undef
    port: 3031,
    host: "localhost",
    publicPath: "/",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: path.resolve(path.join(__dirname, "./node_modules/react")), // eslint-disable-line no-undef
      "babel-core": path.resolve(
        path.join(__dirname, "./node_modules/@babel/core"), // eslint-disable-line no-undef
      ),
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
