const path = require("path")
const webpack = require("webpack")

/* Plugins */
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/index.jsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      { 
        test: /\.(woff|woff2|eot|ttf|svg)$/, 
        use: [
          {
            loader: "url-loader",//,
            options: {
              // Images larger than 10 KB won’t be inlined
              limit: 10 * 1024
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{ loader: MiniCSSExtractPlugin.loader },
              {
                loader: "css-loader",
                options: {
                  minimize: true
                }
              },
              { loader: "postcss-loader" },
              { loader: "less-loader" }
            ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/images/[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: true
            }
          },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "[name]-bundle.js"
  },
  plugins: [
    new MiniCSSExtractPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      inject: true,
    }),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin(),
    autoprefixer
  ],
  externals: {
      // global app config object
      config: JSON.stringify({
          apiUrl: "http://localhost:3000/api"
      })
  }
};
