const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, "./src/"),
  output: {
    path: path.resolve(__dirname, "./dist/public"),
    filename: "js/app.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      ZoappPlugins: path.resolve(__dirname, "./src/plugins/"),
      Zoapp: path.resolve(__dirname, "./src/shared/"),
      ZoappContainers: path.resolve(__dirname, "./src/shared/containers/"),
      MdlExt: path.resolve(__dirname, "./src/shared/components/mdl/"),
      shared: path.resolve(__dirname, "./src/shared/")
    },
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./public/images",
        to: path.resolve(__dirname, "./dist/public/images"),
        force: true
      },
      {
        from: "./server",
        to: path.resolve(__dirname, "./dist"),
        force: true
      },
      {
        from: path.resolve(__dirname, "./package.json"),
        to: path.resolve(__dirname, "./dist/package.json"),
        force: true
      }
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      path: path.resolve(__dirname, "./dist/public"),
      template: "./public/index.html",
    }),
  ]
};
