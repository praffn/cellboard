var path = require('path');

var context = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'build');

module.exports = {

  context: context,

  entry: './index.js',

  output: {
    path: buildPath,
    filename: 'bundle.js',
    libraryTarget: 'umd',
    library: 'Cellboard',
    'umdNamedDefine': true
  },

  module: {
    loaders: [

      // babel es2015
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }

    ]
  }

};
