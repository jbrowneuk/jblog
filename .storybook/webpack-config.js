const path = require('path');

module.exports = ({ config }) => {
  const customAliases = {
    app: path.resolve(__dirname, '../src/app/')
  };

  config.resolve.alias = Object.assign(customAliases, config.resolve.alias);
  return config;
};
