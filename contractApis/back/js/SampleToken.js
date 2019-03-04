const path = require('path');
const { Config, web3Store, sendTx } = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

const abi = fs.readFileSync(
  path.join(__dirname, '../abi/', 'SampleToken.json'),
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
      totalSupply: function() {
        return contract.methods.totalSupply().call();
      },
      balanceOf: function(_owner) {
        return contract.methods.balanceOf(_owner).call();
      },
      allowance: function(_owner, _spender) {
        return contract.methods.allowance(_owner, _spender).call();
      },
      approve: function(_spender, _value, options) {
        const txData = contract.methods.approve(_spender, _value).encodeABI();
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
      transferFrom: function(_from, _to, _value, options) {
        const txData = contract.methods
          .transferFrom(_from, _to, _value)
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
      decreaseApproval: function(_spender, _subtractedValue, options) {
        const txData = contract.methods
          .decreaseApproval(_spender, _subtractedValue)
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
      transfer: function(_to, _value, options) {
        const txData = contract.methods.transfer(_to, _value).encodeABI();
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
      increaseApproval: function(_spender, _addedValue, options) {
        const txData = contract.methods
          .increaseApproval(_spender, _addedValue)
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
