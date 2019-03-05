module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545
    },
    coverage: {
      host: 'localhost',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    }
  },
  compilers: {
    solc: {
      version: '0.4.24'
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'KRW',
      gasPrice: 5
    }
  }
};
