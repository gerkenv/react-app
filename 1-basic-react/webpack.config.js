var deploymentMode = process.env.NODE_ENV || "development"; // "production" 
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: "inline-sourcemap",
  mode: deploymentMode,
  entry: "./js/client.js",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            'react-html-attrs', 
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            'transform-class-properties'
          ],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/dist/",
    filename: "client.min.js"
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: deploymentMode === "development" ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};