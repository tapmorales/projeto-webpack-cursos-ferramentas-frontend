const path = require("path");

const common = require("./webpack.common");
const merge = require("webpack-merge");

const PATH = {
  dist: path.resolve(__dirname, "dist")
};

const config = {
  mode: "development",
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
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
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
  }
};

module.exports = merge.smart(common, config);
