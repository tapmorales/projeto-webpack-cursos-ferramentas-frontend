const path = require("path");
const miniCssWebpackPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const purgeCss = require("purgecss-webpack-plugin");
const glob = require("glob");

const config = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 1
    }
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
    new miniCssWebpackPlugin({
      filename: "css/style[contenthash].css"
    }),
    new purgeCss({
      paths: glob.sync("./**/*.html", { nodir: true })
    })
  ]
};

module.exports = merge.smart(common, config);
