const { network } = require("hardhat");
const {
	networkConfig,
	VERIFICATION_BLOCK_CONFIRMATIONS,
	developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../helper-functions");

module.exports = async function ({ getNamedAccounts, deployments }) {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;
	const networkName = networkConfig[chainId].name;

	const args = [];

	const employers = await deploy("Employers", {
		from: deployer,
		args,
		log: true,
		waitConfirmations: developmentChains.includes(networkName)
			? 1
			: VERIFICATION_BLOCK_CONFIRMATIONS,
	});

	if (!developmentChains.includes(networkName)) {
		await verify(employers.address, args);
	}

	log("---------------------------------");
};

module.exports.tags = ["all", "employers"];
