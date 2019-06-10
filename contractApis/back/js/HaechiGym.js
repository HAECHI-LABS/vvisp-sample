const path = require('path');
const {
  Config,
  getContractFactory,
  sendTx
} = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

const abi = fs.readFileSync(path.join(__dirname, '../abi/', 'HaechiGym.json'), {
  encoding: 'utf8'
});

module.exports = function(_contractAddr = '') {
  const platform = Config.get().platform;
  const Contract = getContractFactory({ platform: platform });
  const contract = new Contract(JSON.parse(abi));
  contract.options.address = _contractAddr;
  return {
    at: function(_addr) {
      contract.options.address = _addr;
    },
    getAddress: function() {
      return contract.options.address;
    },
    methods: {
      haechi: function() {
        return contract.methods.haechi().call();
      },
      owner: function() {
        return contract.methods.owner().call();
      },
      isOwner: function() {
        return contract.methods.isOwner().call();
      },
      makeFaster: function(options) {
        const txData = contract.methods.makeFaster().encodeABI();
        options = {
          ...options,
          data: txData,
          platform: platform
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      },
      setHaechiContract: function(_haechi, options) {
        const txData = contract.methods.setHaechiContract(_haechi).encodeABI();
        options = {
          ...options,
          data: txData,
          platform: platform
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      },
      renounceOwnership: function(options) {
        const txData = contract.methods.renounceOwnership().encodeABI();
        options = {
          ...options,
          data: txData,
          platform: platform
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      },
      transferOwnership: function(newOwner, options) {
        const txData = contract.methods.transferOwnership(newOwner).encodeABI();
        options = {
          ...options,
          data: txData,
          platform: platform
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      }
    }
  };
};

function loadPrivateKey() {
  return Config.get().from;
}
