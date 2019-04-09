const path = require('path');
const { Config, web3Store, sendTx } = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

const abi = fs.readFileSync(
  path.join(__dirname, '../abi/', 'VvispRegistry.json'),
  { encoding: 'utf8' }
);

module.exports = function(_contractAddr = '') {
  const web3 = web3Store.get();
  const contract = new web3.eth.Contract(JSON.parse(abi));
  contract.options.address = _contractAddr;
  return {
    at: function(_addr) {
      contract.options.address = _addr;
    },
    getAddress: function() {
      return contract.options.address;
    },
    methods: {
      upgradeableKeyAddresses: function(_input1) {
        return contract.methods.upgradeableKeyAddresses(_input1).call();
      },
      owner: function() {
        return contract.methods.owner().call();
      },
      isOwner: function() {
        return contract.methods.isOwner().call();
      },
      upgradeableSets: function(_input1) {
        return contract.methods.upgradeableSets(_input1).call();
      },
      nonUpgradeableKeyAddresses: function(_input1) {
        return contract.methods.nonUpgradeableKeyAddresses(_input1).call();
      },
      nonUpgradeableSets: function(_input1) {
        return contract.methods.nonUpgradeableSets(_input1).call();
      },
      updateFileNames: function(
        __keyAddresses,
        __fileNames,
        __fileNameLength,
        options
      ) {
        const txData = contract.methods
          .updateFileNames(__keyAddresses, __fileNames, __fileNameLength)
          .encodeABI();
        options = {
          ...options,
          data: txData
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
          data: txData
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      },
      createProxy: function(_name, options) {
        const txData = contract.methods.createProxy(_name).encodeABI();
        options = {
          ...options,
          data: txData
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      },
      setNonUpgradeables: function(
        __addresses,
        __names,
        __nameLength,
        __fileNames,
        __fileNameLength,
        options
      ) {
        const txData = contract.methods
          .setNonUpgradeables(
            __addresses,
            __names,
            __nameLength,
            __fileNames,
            __fileNameLength
          )
          .encodeABI();
        options = {
          ...options,
          data: txData
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      },
      upgradeToAndCalls: function(
        __proxies,
        __business,
        __data,
        __length,
        options
      ) {
        const txData = contract.methods
          .upgradeToAndCalls(__proxies, __business, __data, __length)
          .encodeABI();
        options = {
          ...options,
          data: txData
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          loadPrivateKey(),
          options
        );
      },
      transferOwnership: function(_newOwner, options) {
        const txData = contract.methods
          .transferOwnership(_newOwner)
          .encodeABI();
        options = {
          ...options,
          data: txData
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
