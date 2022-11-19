const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

require("dotenv").config();

const isDevelopment = process.env.NODE_ENV !== "production";

const port = process.env.PORT || 3001;

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.bundle.js",
    publicPath: "/",
  },
  devtool: "inline-source-map", // will create source maps to help you with debugging you app.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean)[0],
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    open: true,
    hot: true,
    proxy: process.env.proxy,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
};
