const INFURA_API_KEY = 'INPUT_YOUR_INFURA_API_KEY';
const MNEMONIC =
  'edge deny stool exchange scout food like plastic jungle wire wild blanket';

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
    type: 'mnemonic',
    mnemonic: MNEMONIC,
    index: 0
  }
  // from: 'YOUR_PRIVATE_KEY'
};
