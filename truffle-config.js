const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require("path");

require('dotenv').config()
const mnemonic = process.env.MNEMONIC;
const infuraUrl = process.env.INFURA_URL;
const networkId = process.env.NETWORK_ID;
const accountNumber = process.env.ACCOUNT_NUMBER;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    roporrink: {
      provider: () => new HDWalletProvider(mnemonic,infuraUrl,accountNumber),
      network_id: networkId, // id from .env file
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    ganache   : {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // 7545 = Ganache Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  }
};
