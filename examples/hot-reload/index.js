// npm install --save-dev nodemon webpack webpack-cli


// webpack.config.js
const path = require('path');
module.exports = {
  target: 'node',
  entry: './src/index.js', // Replace with the entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watch: true,
  mode: 'development',
};

console.log('Hello, World!'); // Replace with your application code

// "scripts": {
//   "start": "nodemon --exec webpack -- --config webpack.config.js --watch"
// }
