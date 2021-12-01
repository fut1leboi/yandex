var path = require('path');
module.exports = {
    entry: './src/js/script.js',
    mode: "development",
    target: "node", 
    output: {
      filename: 'script.js',
      path: path.resolve(__dirname, 'yandex/js/')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader"
          }
        },
      ]
  }
  };

  