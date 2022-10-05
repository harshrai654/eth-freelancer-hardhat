require("dotenv").config();
const { ethers, network } = require("hardhat");
const path = require("path");
const fs = require("fs");

const FRONTEND_CONST_DIR_ADDRESS = process.env.FRONTEND_CONST_DIR;
const FRONTEND_ADDRESSES_FILE = path.resolve(
	__dirname,
	FRONTEND_CONST_DIR_ADDRESS,
	"contractAddresses.json"
);
const FRONTEND_ABI_FILE = path.resolve(__dirname, FRONTEND_CONST_DIR_ADDRESS, "abi.json");
const CONTRACTS_DIR = path.resolve(__dirname, "../contracts");
const contractNames = fs
	.readdirSync(CONTRACTS_DIR)
	.filter((name) => name.endsWith(".sol"))
	.map((name) => name.substring(0, name.indexOf(".")));

module.exports = async () => {
	if (process.env.UPDATE_FRONTEND) {
		console.log("Updating Frontend");
		await updateContractAddresses();
		await updateAbis();
	}
};

async function updateContractAddresses() {
	let currentAddresses = JSON.parse(fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf-8"));
	let promises = [];

	contractNames.forEach((name) => {
		promises.push(updateContractAddress(name, currentAddresses));
	});

	await Promise.all(promises);

	fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

async function updateAbis() {
	let currentAbis = JSON.parse(fs.readFileSync(FRONTEND_ABI_FILE, "utf-8"));
	let promises = [];

	contractNames.forEach((name) => {
		promises.push(updateAbi(name, currentAbis));
	});

	await Promise.all(promises);

	fs.writeFileSync(FRONTEND_ABI_FILE, JSON.stringify(currentAbis));
}

async function updateAbi(name, currentAbis) {
	const contract = await ethers.getContract(name);
	const chainId = network.config.chainId;
	const abi = contract.interface.format(ethers.utils.FormatTypes.json);

	if (chainId in currentAbis) {
		currentAbis[chainId][name] = abi;
	} else {
		currentAbis[chainId] = {
			[name]: abi,
		};
	}
}

async function updateContractAddress(contractName, currentAddresses) {
	const contract = await ethers.getContract(contractName);
	const chainId = network.config.chainId;

	if (chainId in currentAddresses) {
		currentAddresses[chainId][contractName] = contract.address;
	} else {
		currentAddresses[chainId] = {
			[contractName]: contract.address,
		};
	}
}

module.exports.tags = ["all", "frontend"];
