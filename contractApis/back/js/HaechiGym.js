const path = require('path');
const { getWeb3, getPrivateKey, sendTx } = require('@haechi-labs/vvisp-utils');
const web3 = getWeb3();
const fs = require('fs');

const privateKey = getPrivateKey(process.env.MNEMONIC, process.env.PRIV_INDEX);

const abi = fs.readFileSync(path.join(__dirname, '../abi/', 'HaechiGym.json'), {
  encoding: 'utf8'
});

module.exports = function(_contractAddr = '') {
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
          data: txData
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          privateKey,
          options
        );
      },
      setHaechiContract: function(__haechi, options) {
        const txData = contract.methods.setHaechiContract(__haechi).encodeABI();
        options = {
          ...options,
          data: txData
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          privateKey,
          options
        );
      },
      initialize: function(__owner, __haechi, options) {
        const txData = contract.methods
          .initialize(__owner, __haechi)
          .encodeABI();
        options = {
          ...options,
          data: txData
        };
        return sendTx(
          contract.options.address,
          options ? options.value : 0,
          privateKey,
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
          privateKey,
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
          privateKey,
          options
        );
      }
    }
  };
};
