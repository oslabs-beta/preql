var path = require("path");
var HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "build"),
        publicPath: '/build',
        filename: "index_bundle.js"
    },
    mode: process.env.NODE_ENV,
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
          },
          {
            //npm install -D sass-loader css-loader style-loader webpack
            // /\.s[ac]ss$/i
            // /\.css /
            test: /\.s?css/,
            use: ["style-loader", "css-loader", "sass-loader"
            ],
          },
        ]
    },
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: [".js", ".jsx"],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, '/'),
        },
      proxy: {
        '/': 'http://localhost:3000'
      },
      // publicPath: '/',
      compress: true,
      port: 8080,
  },
};
