const path = require('path');
const {
  Config,
  getContractFactory,
  sendTx
} = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

let abi;

module.exports = function(_contractAddr = '') {
  abi = fs.readFileSync(path.join(__dirname, '../abi/', 'SampleToken.json'), {
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
      totalSupply: function() {
        return contract.methods.totalSupply().call();
      },
      balanceOf: function(owner) {
        return contract.methods.balanceOf(owner).call();
      },
      allowance: function(owner, spender) {
        return contract.methods.allowance(owner, spender).call();
      },
      approve: function(spender, value, options) {
        const txData = contract.methods.approve(spender, value).encodeABI();
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
      transferFrom: function(from, to, value, options) {
        const txData = contract.methods
          .transferFrom(from, to, value)
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
      decreaseApproval: function(spender, subtractedValue, options) {
        const txData = contract.methods
          .decreaseApproval(spender, subtractedValue)
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
      transfer: function(to, value, options) {
        const txData = contract.methods.transfer(to, value).encodeABI();
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
      increaseApproval: function(spender, addedValue, options) {
        const txData = contract.methods
          .increaseApproval(spender, addedValue)
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
      }
    }
  };
};

function loadPrivateKey() {
  return Config.get().from;
}
