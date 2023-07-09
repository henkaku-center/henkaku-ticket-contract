import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'
import 'hardhat-gas-reporter'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    polygon: {
      url: process.env.POLYGON_ALCHEMY_KEY!,
      accounts: [process.env.MAIN_PRIVATE_KEY!],
      gasPrice: 180000000000,
    },
    mumbai: {
      url: process.env.MUMBAI_ALCHEMY_KEY!,
      accounts: [process.env.TEST_PRIVATE_KEY!],
    },
    goerli: {
      url: process.env.GOERLI_ALCHEMY_KEY!,
      accounts: [process.env.TEST_PRIVATE_KEY!],
    },
    local: {
      url: 'http://localhost:8545',
      accounts: [`${process.env.LOCAL_PRIVATE_KEY}`],
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY!,
      polygon: process.env.POLYGONSCAN_API_KEY!,
      goerli: process.env.ETHERSCAN_API_KEY!,
    },
  },
}

export default config
