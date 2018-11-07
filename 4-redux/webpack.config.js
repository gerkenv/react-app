var webpack = require('webpack');
var path = require('path');

// define deployment mode - "development", "production" or "none".
var deploymentMode = process.env.NODE_ENV || "development";

module.exports = {
  // deployment mode
  mode: deploymentMode,                 
  // absolute path to resolve `entry`
  context: path.join(__dirname, "src"), 
  // debug utility which helps to determine an error in bundle. It shows directly the submodule that provoked an error
  devtool: deploymentMode === "development" ? 'inline-source-map' : null, 
  // entry point for compilation
  // entry: "./js/client.js", or you have several entries
  entry: {
    client: './js/client.js'
  },
  // live reloading option for `webpack` executable
  watch: true, 
  module: {
    // specific rules for all files that match to RegEx in `test`
    rules: [ 
      {
        // rules for *.js and *.jsx files
        test: /\.jsx?$/,
        // excluded folders
        exclude: /(node_modules|bower_components)/, 
        loader: 'babel-loader',
        // replacement of configuration file (.babelrc) of a loader
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
  // output definitions
  output: { 
    // absolute output path where bundles will be delivered
    path: path.resolve(__dirname, 'dist'), 
    // Only for `webpack-dev-server`.
    // Compiled files will not be moved to output path, they will be hold in
    // memory and served to `host/publicPath` URI (by default 
    // `http://localhost:8080/publicPath/`).
    publicPath: "/",
    // file name for a bundle(s)
    filename: "[name].min.js"
  },
  // Development server `webpack-dev-server` settings
  devServer: {
    // All files from `contentBase` are served from `host` URI (by default 
    // `http://localhost:8080/`).
    contentBase: './dist',
    // Also server can monitoring files in `contentBase` and provide live 
    // reloading if something changes
    watchContentBase: true
  },
  plugins: deploymentMode === "development" ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};