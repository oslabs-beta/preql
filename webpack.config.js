var path = require("path");
var HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "build"),
        publicPath: '/build',
        filename: "index_bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              },
            },
            exclude: /npm_modules/
          }
        ]
    },
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: [".js", ".jsx"],
    }
};