const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// каждый раз создает index.html в папке build
// const CleanWebpackPlugin = require('clean-webpack-plugin'); //очищать папку build
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //Компилятор scss файлов


module.exports = {
  mode: 'development',
  entry: [
    './src/index.js',
    // './src/style/app.scss'
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      include: path.resolve(__dirname, './src/style'),
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {}
      },
        {
          loader: 'css-loader',
          options: {
            sourceMap: false
          }
        }, {
          loader: 'resolve-url-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader:'sass-loader',
          options: {
            sourceMap: true,
            sourceMapContents: false
          }
        }]
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      allChunks: true,
      filename: 'app.css',
      chunkFilename: '[id].css'
    }),
    // new CleanWebpackPlugin(['dist/*']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};