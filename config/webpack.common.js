const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATH = {
  dist: path.resolve(__dirname, "dist")
};

const config = {
  entry: {
    hello: "./src/hello.js",
    index: "./src/index.js"
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: PATH.dist
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: ["@babel/preset-env"],
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions", "ie 11"]
                  }
                }
              ]
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties"],
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "index.html"
    }),
    new CleanWebpackPlugin()
  ]
};

module.exports = config;
