const path = require('path');
const { Config, web3Store, sendTx } = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

const abi = fs.readFileSync(path.join(__dirname, '../abi/', 'IHaechi.json'), {
  encoding: 'utf8'
});

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
      velocities: function(_id) {
        return contract.methods.velocities(_id).call();
      },
      haechiIds: function(_owner) {
        return contract.methods.haechiIds(_owner).call();
      },
      distances: function(_id) {
        return contract.methods.distances(_id).call();
      },
      gym: function() {
        return contract.methods.gym().call();
      },
      makeNewHaechi: function(_id, options) {
        const txData = contract.methods.makeNewHaechi(_id).encodeABI();
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
      increaseVelocity: function(_haechiId, _diff, options) {
        const txData = contract.methods
          .increaseVelocity(_haechiId, _diff)
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
      run: function(options) {
        const txData = contract.methods.run().encodeABI();
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
      initialize: function(_gym, options) {
        const txData = contract.methods.initialize(_gym).encodeABI();
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
