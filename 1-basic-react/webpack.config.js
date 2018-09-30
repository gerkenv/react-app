var debug = process.env.NODE_ENV || "development"; // "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    mode: debug,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/script.js",
    output: {
        path: __dirname + "/js",
        filename: "script.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ]
};