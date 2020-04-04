/* eslint-disable */
const {override, addWebpackModuleRule} = require('customize-cra');

module.exports = override(
  // Add base64 converter
  addWebpackModuleRule({
    test: /\.base64\.(png|jpg|gif|svg)$/i,
    use: [{loader: 'url-loader'}],
  }),
);
