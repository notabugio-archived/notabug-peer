/* global __dirname, require, module*/

require("webpack");
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const pkg = require("./package.json");

let libraryName = pkg.name;

let outputFile, mode;

if (env === "build") {
  mode = "production";
  outputFile = libraryName + ".min.js";
} else {
  mode = "development";
  outputFile = libraryName + ".js";
}

const config = {
  mode: mode,
  entry: __dirname + "/src/index.js",
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  },
  externals: {
    argon2: "argon2",
    "gun-scope": "gun-scope",
    "gun-suppressor": "gun-suppressor",
    "gun-suppressor-sear": "gun-suppressor-sear",
    "object-hash": "object-hash",
    "fast-memoize": "fast-memoize",
    ramda: "ramda",
    "route-parser": "route-parser",
    "uri-js": "uri-js"
  },
  node: {
    Buffer: false
  }
};

module.exports = config;
