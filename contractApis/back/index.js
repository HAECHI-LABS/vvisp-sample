const { Config, web3Store } = require('@haechi-labs/vvisp-utils');

module.exports = function(configOption, web3Setter) {
  setters.config(configOption);
  setters.setWeb3(web3Setter);

  return {
    config: setters.config,
    ...loadApis()
  };
};

function loadApis() {
  const apis = {};

  apis['Haechi'] = require('./js/Haechi.js');
  apis['HaechiGym'] = require('./js/HaechiGym.js');
  apis['VvispRegistry'] = require('./js/VvispRegistry.js');
  return apis;
}

const setters = {
  config: configObj => {
    let config;
    try {
      config = Config.get(configObj);
    } catch (e) {}
    if (!config) {
      config = new Config();
      config.merge(configObj);
    }
    Config.setStore(config);
  },
  setWeb3: web3Setter => {
    if (web3Setter && typeof web3Setter === 'string') {
      web3Store.setWithURL(web3Setter);
    } else if (web3Setter) {
      web3Store.setWithProvider(web3Setter);
    } else {
      const config = Config.get();
      let provider;
      try {
        provider = config.provider;
      } catch (e) {}
      if (!provider) {
        throw new Error(
          `Input network config as the second parameter or set network in config file`
        );
      }
      web3Store.setWithProvider(provider);
    }
  }
};
