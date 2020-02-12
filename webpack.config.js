const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssWebpackPlugin = require("mini-css-extract-plugin");

const PATH = {
  dist: path.resolve(__dirname, "dist")
};

module.exports = {
  // entry: "./src/app.js",
  entry: {
    hello: "./src/hello.js",
    index: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: PATH.dist
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 1
    }
  },
  devServer: {
    contentBase: PATH.dist
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          { loader: miniCssWebpackPlugin.loader },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "index.html"
    }),
    new miniCssWebpackPlugin({
      filename: "css/style.css"
    })
  ]
};
