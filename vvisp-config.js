const INFURA_API_KEY = 'INPUT_YOUR_INFURA_API_KEY';
const MNEMONIC =
  'piano garage flag neglect spare title drill basic strong aware enforce fury';

const externalConfig = require('./truffle-config');

externalConfig.networks.ropsten = {
  url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`
};

externalConfig.networks.baobab = {
  platform: 'klaytn',
  url: 'https://api.baobab.klaytn.net:8651'
};

module.exports = {
  ...externalConfig,
  from: {
    mnemonic: MNEMONIC,
    index: 0
  }
  // from: 'YOUR_PRIVATE_KEY'
};
