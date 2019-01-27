const path = require('path');
const rewireLess = require('react-app-rewire-less');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');


module.exports = function override(config, env) {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules);

  config = rewireReactHotLoader(config, env);

  config = rewireLess.withLoaderOptions({
    modifyVars: {},
  })(config, env);

  return config;
};
