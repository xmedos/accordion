const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');
const entries = glob.sync('./components/**/**\.sass');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./app.js', ...entries],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  node: {
    fs: 'empty'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs'
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {from: 'lib/*.*', to: path.resolve(__dirname, './dist')},
      {from: 'components/**/*.*', to: path.resolve(__dirname, './dist')}
    ])
  ]
};
