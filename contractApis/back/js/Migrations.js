const path = require('path');
const {
  Config,
  getContractFactory,
  sendTx
} = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

let abi;

module.exports = function(_contractAddr = '') {
  abi = fs.readFileSync(path.join(__dirname, '../abi/', 'Migrations.json'), {
    encoding: 'utf8'
  });

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
      last_completed_migration: function() {
        return contract.methods.last_completed_migration().call();
      },
      owner: function() {
        return contract.methods.owner().call();
      },
      upgrade: function(new_address, options) {
        const txData = contract.methods.upgrade(new_address).encodeABI();
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
      setCompleted: function(completed, options) {
        const txData = contract.methods.setCompleted(completed).encodeABI();
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
