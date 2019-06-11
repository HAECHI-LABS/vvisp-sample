const path = require('path');
const {
  Config,
  getContractFactory,
  sendTx
} = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

let abi;

module.exports = function(_contractAddr = '') {
  abi = fs.readFileSync(path.join(__dirname, '../abi/', 'VvispRegistry.json'), {
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
      contractSets: function(input1) {
        return contract.methods.contractSets(input1).call();
      },
      owner: function() {
        return contract.methods.owner().call();
      },
      isOwner: function() {
        return contract.methods.isOwner().call();
      },
      contractKeyAddresses: function(input1) {
        return contract.methods.contractKeyAddresses(input1).call();
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
      registerContractInfo: function(
        _addresses,
        _names,
        _nameLength,
        _fileNames,
        _fileNameLength,
        options
      ) {
        const txData = contract.methods
          .registerContractInfo(
            _addresses,
            _names,
            _nameLength,
            _fileNames,
            _fileNameLength
          )
          .encodeABI();
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
