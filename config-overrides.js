/* eslint-disable */
const {override, addWebpackModuleRule} = require('customize-cra');

module.exports = override(
  // Add base64 converter
  addWebpackModuleRule({
    test: /\.(png|jpg|gif)$/i,
    use: [{loader: 'url-loader'}],
  }),
);
