require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("./tasks");
require("@appliedblockchain/chainlink-plugins-fund-link");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const GOERLI_RPC_URL =
	process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// optional

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key";

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
		},
		localhost: {
			chainId: 1337,
		},
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
			//   accounts: {
			//     mnemonic: MNEMONIC,
			//   },
			saveDeployments: true,
			chainId: 5,
		},
	},
	etherscan: {
		// yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			goerli: ETHERSCAN_API_KEY,
		},
	},
	contractSizer: {
		runOnCompile: false,
		only: ["APIConsumer", "KeepersCounter", "PriceConsumerV3", "RandomNumberConsumerV2"],
	},
	namedAccounts: {
		deployer: {
			default: 0, // here this will by default take the first account as deployer
			1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
		},
		feeCollector: {
			default: 1,
		},
	},
	solidity: {
		compilers: [
			{
				version: "0.8.7",
			},
			{
				version: "0.6.6",
			},
			{
				version: "0.4.24",
			},
		],
	},
	mocha: {
		timeout: 200000, // 200 seconds max for running tests
	},
};
