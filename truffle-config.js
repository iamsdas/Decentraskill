const path = require('path');
// const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
// const mnemonic = process.env.MNEMONIC;
// const url = process.env.POLYGON_MUMBAI_RPC_URL;

module.exports = {
  contracts_build_directory: path.join(__dirname, 'src/abis'),
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '',
    },
    // matic: {
    //   provider: () => new HDWalletProvider(mnemonic, url),
    //   network_id: 80001,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },
  },

  compilers: {
    solc: {
      version: '0.8.1',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // api_keys: {
  //   polygonscan: process.env.POLYGONSCAN_API_KEY,
  // },
  plugins: ['truffle-plugin-verify'],
};
