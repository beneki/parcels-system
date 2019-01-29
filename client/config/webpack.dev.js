const path = require("path");
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index.jsx',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { 
        test: /\.(woff|woff2|eot|ttf|svg)$/, 
        loader: "url-loader?limit=100000" 
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ]
      },
      {
        test: /\.less$/,
        use: [{ loader: "style-loader" },
              { loader: "css-loader"},
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
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // output: {
  //   path: __dirname + '/dist',
  //   publicPath: '/',
  //   filename: 'bundle.js'
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    autoprefixer
  ],
  // devServer: {
  //   contentBase: './dist',
  //   hot: true
  // }

  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist",
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },
  externals: {
      // global app config object
      config: JSON.stringify({
          apiUrl: 'http://localhost:3000/api'
      })
  }
};
