const webpack = require('@cypress/webpack-preprocessor');

const options = {
  webpackOptions: require('../webpack.config'),
};

module.exports = webpack(options);
