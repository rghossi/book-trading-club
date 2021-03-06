var webpack = require('webpack');

module.exports = {
  entry: [
    './client/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    { test: /\.css$/, loader: "style-loader!css-loader" }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: "eval",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BROWSER': JSON.stringify(true)
    })
  ]
};