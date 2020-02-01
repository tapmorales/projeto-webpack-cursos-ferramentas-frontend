const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const PATH = {
  dist: path.resolve(__dirname, "dist")
};

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: PATH.dist
  },
  devServer: {
    contentBase: PATH.dist
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
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
    })
  ]
};
