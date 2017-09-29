const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules=true&sourceMap=true&minimize=true&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'stylus-loader',
            {
              loader: 'stylus-resources-loader',
              options: {
                resources: './src/**/*.styl'
              }
            }
          ]
        })
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html',
      inject: 'body',
      cache: true,
      hash: true
    }),
    new ExtractTextPlugin({
      filename: './public/app.css',
      allChunks: true
    })
  ],
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000,
    historyApiFallback: true
  }
};
