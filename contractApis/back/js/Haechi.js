const path = require('path');
const { Config, web3Store, sendTx } = require('@haechi-labs/vvisp-utils');
const fs = require('fs');

const abi = fs.readFileSync(path.join(__dirname, '../abi/', 'Haechi.json'), {
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
      velocities: function(__id) {
        return contract.methods.velocities(__id).call();
      },
      haechiIds: function(__owner) {
        return contract.methods.haechiIds(__owner).call();
      },
      distances: function(__id) {
        return contract.methods.distances(__id).call();
      },
      gym: function() {
        return contract.methods.gym().call();
      },
      makeNewHaechi: function(__id, options) {
        const txData = contract.methods.makeNewHaechi(__id).encodeABI();
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
      increaseVelocity: function(__haechiId, __diff, options) {
        const txData = contract.methods
          .increaseVelocity(__haechiId, __diff)
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
      initialize: function(__gym, options) {
        const txData = contract.methods.initialize(__gym).encodeABI();
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
