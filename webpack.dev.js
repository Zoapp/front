const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(commonConfig, {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3031",
    "webpack/hot/only-dev-server",
    "./client/index.js"
  ],
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "./dist/public"),
    port: 3031,
    host: "localhost",
    publicPath: "/",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader",],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?modules",],
      },
    ],
  },  
  plugins: [
    /*new webpack.HotModuleReplacementPlugin(),*/
    new webpack.NamedModulesPlugin(),
  ]
});

