const path = require('path');
const { getWeb3, getPrivateKey, sendTx } = require('@haechi-labs/vvisp-utils');
const web3 = getWeb3();
const fs = require('fs');

const privateKey = getPrivateKey(process.env.MNEMONIC, process.env.PRIV_INDEX);

const abi = fs.readFileSync(path.join(__dirname, '../abi/', 'HaechiV2.json'), {
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
      velocities: function(__id) {
        return contract.methods.velocities(__id).call();
      },
      haechiIds: function(__owner) {
        return contract.methods.haechiIds(__owner).call();
      },
      heights: function(__id) {
        return contract.methods.heights(__id).call();
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
          privateKey,
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
          privateKey,
          options
        );
      },
      fly: function(options) {
        const txData = contract.methods.fly().encodeABI();
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
      run: function(options) {
        const txData = contract.methods.run().encodeABI();
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
      initialize: function(__gym, options) {
        const txData = contract.methods.initialize(__gym).encodeABI();
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
