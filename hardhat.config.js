require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');

const { privateKey,  projectID } = require('./secrets.json');

module.exports = {
  networks: {
    hardhat: {
        chainId: 1337
    },
    rinkeby: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${projectID}`,
        accounts: [`${privateKey}`]
    }
  },
  solidity: '0.8.4'
};
